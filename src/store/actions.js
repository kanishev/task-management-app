import { generateId } from "../utlis/generateId";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

export default {
  async saveBoard({ commit, state }, payload) {
    try {
      state.isLoading = true;
      const dataBase = await db.collection("boards").doc();
      await dataBase.set({
        profileId: state.profileId,
        boardId: dataBase.id,
        boardName: payload.name,
        boardDescription: payload.description,
        boardImage: payload.image,
        lists: [],
        archived: false,
      });

      commit("saveBoard", { boardId: dataBase.id, ...payload });
      commit("closeModal");
    } catch (e) {
      console.log(e);
    } finally {
      state.isLoading = false;
    }
  },
  async updateBoard({ commit, state }, payload) {
    try {
      state.isLoading = true;
      const dataBase = await db.collection("boards").doc(payload.id);
      commit("saveBoard", { boardId: dataBase.id, ...payload });

      await dataBase.update({
        boardName: payload.name,
        boardDescription: payload.description,
      });

      commit("closeModal");
    } catch (e) {
      console.log(e);
    } finally {
      state.isLoading = false;
    }
  },
  async archiveBoard({ commit }, payload) {
    try {
      let archived = !payload.archived;
      commit("archiveBoard", { ...payload, archived });

      const dataBase = await db.collection("boards").doc(payload.id);
      await dataBase.update({
        archived: archived,
      });
    } catch (e) {
      console.log(e);
    }
  },
  async reorderList({ commit }, { boardId, payload }) {
    try {
      commit("reorderList", { boardId, payload });

      const dataBase = await db.collection("boards").doc(boardId);
      await dataBase.update({
        lists: payload,
      });
    } catch (e) {
      console.log(e);
    }
  },
  async getUser({ commit }) {
    try {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

      const dbResults = await dataBase.get();
      commit("setProfile", dbResults);
      commit("setProfileInitials");
    } catch (e) {
      console.log(e);
    }
  },
  async updateUserProfile({ state, commit }) {
    try {
      this.state.isLoading = true;
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
      });
      commit("setProfileInitials");
    } catch (e) {
      console.log(e);
    } finally {
      this.state.isLoading = false;
    }
  },
  async getBoards({ state, commit }) {
    try {
      commit("setLoading", true);

      const dataBase = await db.collection("boards");
      const dbResults = await dataBase.get();

      dbResults.forEach((doc) => {
        if (doc.data().profileId === state.profileId) {
          if (!state.boards.some((b) => b.id == doc.id)) {
            const board = {
              id: doc.data().boardId,
              name: doc.data().boardName,
              description: doc.data().boardDescription,
              lists: doc.data().lists,
              archived: doc.data().archived,
              image: doc.data().boardImage,
            };

            state.boards.push(board);
          }
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      commit("setLoading", false);
    }
  },
  async createTaskList({ commit, state }, payload) {
    try {
      state.isLoading = true;
      const dataBase = db.collection("boards").doc(payload.boardId);
      const board = await dataBase.get();

      const list = {
        ...payload,
        id: generateId(),
      };

      await dataBase.update({
        lists: [...board.data().lists, list],
      });

      commit("createTaskList", list);
      commit("closeModal");
    } catch (e) {
      console.log(e);
    } finally {
      state.isLoading = false;
    }
  },
  async updateTaskList({ commit, state }, payload) {
    try {
      state.isLoading = true;
      commit("createTaskList", payload);
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

      commit("closeModal");
    } catch (e) {
      console.log(e);
    } finally {
      state.isLoading = false;
    }
  },
  async archiveTaskList({ commit }, payload) {
    try {
      commit("archiveList", payload);

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
  async createListItem({ commit }, payload) {
    try {
      const id = generateId();
      commit("createListItem", { ...payload, id });

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
  async updateListItem({ commit }, payload) {
    try {
      commit("updateListItem", payload);

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
  async removeListItem({ commit }, payload) {
    try {
      commit("removeListItem", payload);

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
  async reorderListItems({ commit, state }, payload) {
    try {
      commit("reorderListItems", payload);
      state.reorderLists.lists.push(payload);

      const dataBase = db.collection("boards").doc(payload.boardId);
      const board = await dataBase.get();
      const lists = board.data().lists;

      if (state.reorderLists.count == 0) {
        state.reorderLists.count++;
      } else {
        state.reorderLists.lists.forEach(async (list) => {
          const listId = board
            .data()
            .lists.findIndex((l) => l.id == list.listId);

          lists[listId].items = list.payload;

          await dataBase.update({
            lists: [...lists],
          });
          state.reorderLists.count == 0;
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
