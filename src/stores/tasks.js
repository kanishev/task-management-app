
import { defineStore } from "pinia";
import { useBoardsStore } from './boards';
import { generateId } from "../utlis/generateId";

import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    reorderLists: {
      count: 0,
      lists: [],
    },
  }),
  actions: {
    async createTaskList(payload) {
      try {
        const dataBase = db.collection("boards").doc(payload.boardId);
        const board = await dataBase.get();

        const list = {
          ...payload,
          id: generateId(),
        };

        await dataBase.update({
          lists: [...board.data().lists, list],
        });

        this.createTaskListSync(list)
      } catch (e) {
        console.log(e);
      }
    },

    async updateTaskList(payload) {
      try {
        this.createTaskListSync(payload);
        const dataBase = db.collection("boards").doc(payload.boardId);
        const board = await dataBase.get();
        const lists = board.data().lists;
        const list = lists.find((l) => l.id == payload.listId);
        const listIndex = lists.findIndex((l) => l.id == payload.listId);

        list.name = payload.name;
        lists[listIndex] = list;

        await dataBase.update({
          lists,
        });

      } catch (e) {
        console.log(e);
      }
    },
    async archiveTaskList(payload) {
      try {
        this.archiveTaskListSync(payload);
        const dataBase = db.collection("boards").doc(payload.boardId);
        const board = await dataBase.get();
        const lists = board.data().lists;
        const list = lists.find((l) => l.id == payload.listId);
        const listIndex = lists.findIndex((l) => l.id == payload.listId);

        list.archived = !list.archived;
        lists[listIndex] = list;

        await dataBase.update({
          lists,
        });
      } catch (e) {
        console.log(e);
      }
    },

    async createListItem(payload) {
      try {
        const id = generateId();
        this.createListItemSync({ ...payload, id })

        const dataBase = db.collection("boards").doc(payload.boardId);
        const board = await dataBase.get();

        const lists = board.data().lists;
        const list = lists.find((l) => l.id == payload.listId);
        const listId = board
          .data()
          .lists.findIndex((l) => l.id == payload.listId);

        list.items.push({ name: payload.name, itemId: id });

        lists[listId] = list;

        await dataBase.update({
          lists,
        });
      } catch (e) {
        console.log(e);
      }
    },

    async updateListItem(payload) {
      try {
        this.updateListItemSync(payload)
        const dataBase = db.collection("boards").doc(payload.boardId);
        const board = await dataBase.get();
        const lists = board.data().lists;
        const items = lists.find((l) => l.id == payload.listId).items;
        const listId = lists.findIndex((l) => l.id == payload.listId);

        const item = items.find((i) => i.itemId == payload.itemId);
        item.name = payload.name;

        lists[listId].items = items;

        await dataBase.update({
          lists: [...lists],
        });
      } catch (e) {
        console.log(e);
      }
    },

    async removeListItem(payload) {
      try {
        this.removeListItemSync(payload);
        const dataBase = db.collection("boards").doc(payload.boardId);
        const board = await dataBase.get();
        const lists = board.data().lists;
        const items = lists
          .find((l) => l.id == payload.listId)
          .items.filter((i) => i.itemId !== payload.itemId);
        const listId = lists.findIndex((l) => l.id == payload.listId);

        lists[listId].items = items;

        await dataBase.update({
          lists: [...lists],
        });
      } catch (e) {
        console.log(e);
      }
    },

    async reorderList({ boardId, payload }) {
      try {
        this.reorderListSync({ boardId, payload });

        const dataBase = await db.collection("boards").doc(boardId);
        await dataBase.update({
          lists: payload,
        });
      } catch (e) {
        console.log(e);
      }
    },

    async reorderListItems(payload) {
      try {
        this.reorderListItemsSync(payload);
        this.reorderLists.lists.push(payload);

        const dataBase = db.collection("boards").doc(payload.boardId);
        const board = await dataBase.get();
        const lists = board.data().lists;

        if (this.reorderLists.count == 0) {
          this.reorderLists.count++;
        } else {
          this.reorderLists.lists.forEach(async (list) => {
            const listId = board
              .data()
              .lists.findIndex((l) => l.id == list.listId);

            lists[listId].items = list.payload;

            await dataBase.update({
              lists: [...lists],
            });
            this.reorderLists.count == 0;
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

    createTaskListSync(payload) {
      const boardsStore = useBoardsStore();
      const board = boardsStore.boards.find((b) => b.id == payload.boardId);
      const boardId = boardsStore.boards.findIndex((b) => b.id == payload.boardId);

      const list = board.lists.find((l) => l.id === payload.listId);
      const listIdx = board.lists.findIndex((l) => l.id == payload.listId);

      if (listIdx !== -1) {
        list.name = payload.name;
        boardsStore.boards[boardId].lists[listIdx] = list;
      } else {
        const list = {
          id: payload.id,
          name: payload.name,
          archived: false,
          items: [],
        };
        board.lists.push(list);
      }
    },
    createListItemSync(payload) {
      const boardsStore = useBoardsStore();
      const board = boardsStore.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id === payload.listId);
      const item = {
        itemId: payload.id,
        name: payload.name,
      };

      list.items.push(item);
    },

    removeListItemSync(payload) {
      const boardsStore = useBoardsStore();
      const board = boardsStore.boards.find((b) => b.id == payload.boardId);
      const items = board.lists.find((l) => l.id === payload.listId).items;
      const itemsId = board.lists.findIndex((l) => l.id == payload.listId);
      let updatedItems = items.filter((i) => i.itemId !== payload.itemId);
      board.lists[itemsId].items = updatedItems;
    },

    updateListItemSync(payload) {
      const boardsStore = useBoardsStore();
      const board = boardsStore.boards.find((b) => b.id == payload.boardId);
      const items = board.lists.find((l) => l.id === payload.listId).items;
      let item = items.find((i) => i.itemId == payload.itemId);
      item.name = payload.name;
    },

    reorderListSync(payload){
      const boardsStore = useBoardsStore();
      const boardId = boardsStore.boards.findIndex((b) => b.id == payload.boardId);
      boardsStore.boards[boardId].lists = payload.payload;
    },

    reorderListItemsSync(payload) {
      const boardsStore = useBoardsStore();
      const board = boardsStore.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id == payload.listId);

      list.items = payload.payload;
    },

    archiveTaskListSync(payload) {
      const boardsStore = useBoardsStore();
      const board = boardsStore.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id == payload.listId);
      list.archived = !list.archived;
    },
  },
  getters: {
    archivedLists() {
      const boardsStore = useBoardsStore();
      return boardsStore.activeBoard ? boardsStore.activeBoard.lists.filter((l) => l.archived) : []
    }
  }
})
