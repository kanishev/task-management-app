import { defineStore } from "pinia";
import { useUserStore } from './user';

import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

export const useBoardsStore = defineStore('boards', {
  state: () => ({
    boards: [],
    activeBoard: null,
    reorderLists: {
      count: 0,
      lists: [],
    },
  }),
  actions: {
    async getBoards() {
      try {
        // commit("setLoading", true);
        const user = useUserStore();
        const dataBase = await db.collection("boards");
        const dbResults = await dataBase.get();

        dbResults.forEach((doc) => {
          if (doc.data().profileId === user.profileId) {
            if (!this.boards.some((b) => b.id == doc.id)) {
              const board = {
                id: doc.data().boardId,
                name: doc.data().boardName,
                description: doc.data().boardDescription,
                lists: doc.data().lists,
                archived: doc.data().archived,
                image: doc.data().boardImage,
              };

              this.boards.push(board);
            }
          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        // commit("setLoading", false);
      }
    },
    async saveBoard(payload) {
      try {
        // state.isLoading = true;
        const user = useUserStore();
        const dataBase = await db.collection("boards").doc();
        await dataBase.set({
          profileId: user.profileId,
          boardId: dataBase.id,
          boardName: payload.name,
          boardDescription: payload.description,
          boardImage: payload.image,
          lists: [],
          archived: false,
        });

        this.saveBoardSync({ boardId: dataBase.id, ...payload })
        // commit("closeModal");
      } catch (e) {
        console.log(e);
      } finally {
        // state.isLoading = false;
      }
    },
    async updateBoard(payload) {
      try {
        // state.isLoading = true;
        const dataBase = await db.collection("boards").doc(payload.id);
        this.saveBoardSync({ boardId: dataBase.id, ...payload })

        await dataBase.update({
          boardName: payload.name,
          boardDescription: payload.description,
        });

        // commit("closeModal");
      } catch (e) {
        console.log(e);
      } finally {
        // state.isLoading = false;
      }
    },
    async archiveBoard(payload) {
      try {
        let archived = !payload.archived;
        this.archiveBoardSync({ ...payload, archived });

        const dataBase = await db.collection("boards").doc(payload.id);
        await dataBase.update({
          archived: archived,
        });
      } catch (e) {
        console.log(e);
      }
    },
    saveBoardSync(payload) {
      const board = this.boards.find((b) => b.id == payload.id);
      const idx = this.boards.findIndex((b) => b.id === payload.id);

      if (idx !== -1) {
        board.name = payload.name;
        board.description = payload.description;
        this.boards[idx] = board;
      } else {
        const board = {
          id: payload.boardId,
          name: payload.name,
          description: payload.description,
          lists: [],
          image: null,
          archived: false,
        };
        this.boards.push(board);
      }
    },
    archiveBoardSync(payload) {
      const board = this.boards.find((b) => b.id == payload.id);
      board.archived = payload.archived;
    },
    updateBoardImage(payload) {
      const board = this.boards.find((b) => b.id == payload.id);
      board.image = payload.image;
    },
    setActiveBoard(payload) {
      this.activeBoard = payload;
    }
  },
  getters: {
    unarchivedBoards() {
      return this.boards.filter((b) => !b.archived);
    },
    archivedBoards() {
      return this.boards.filter((b) => b.archived);
    }
  }
})