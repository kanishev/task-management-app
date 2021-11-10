import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);
import { generateId } from "../utlis/generateId";
export default new Vuex.Store({
  state: {
    user: null,
    boards: [],
    activeBoard: null,
    activePage: "default",
    isLoading: false,
    modal: {
      status: false,
      page: null,
      type: null,
      board: null,
      lists: null,
    },

    // Profile
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileId: null,
    profileInitials: null,

    reorderLists: {
      count: 0,
      lists: [],
    },
  },
  mutations: {
    // MODAL

    openModal(state, payload) {
      state.modal.status = true;
      state.modal.board = payload.board;
      state.modal.page = payload.page;
      state.modal.type = payload.type;
      state.modal.list = payload.list;
    },
    closeModal(state) {
      state.modal.status = true;
      state.modal.board = null;
      state.modal.page = null;
      state.modal.type = null;
      state.modal.list = null;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },

    // BOARDS

    saveBoard(state, payload) {
      const board = state.boards.find((b) => b.id == payload.id);
      const idx = state.boards.findIndex((b) => b.id === payload.id);

      if (idx !== -1) {
        board.name = payload.name;
        board.description = payload.description;
        state.boards[idx] = board;
      } else {
        const board = {
          id: payload.boardId,
          name: payload.name,
          description: payload.description,
          lists: [],
          image: null,
          archived: false,
        };
        state.boards.push(board);
      }
    },
    archiveBoard(state, payload) {
      const board = state.boards.find((b) => b.id == payload.id);
      board.archived = payload.archived;
    },
    updateBoardImage(state, payload) {
      const board = state.boards.find((b) => b.id == payload.id);
      board.image = payload.image;
      console.log(board);
    },

    // LISTS

    createTaskList(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const boardId = state.boards.findIndex((b) => b.id == payload.boardId);

      const list = board.lists.find((l) => l.id === payload.listId);
      const listIdx = board.lists.findIndex((l) => l.id == payload.listId);

      if (listIdx !== -1) {
        list.name = payload.name;
        state.boards[boardId].lists[listIdx] = list;
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
    createListItem(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id === payload.listId);
      const item = {
        itemId: payload.id,
        name: payload.name,
      };

      list.items.push(item);
    },
    removeListItem(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const items = board.lists.find((l) => l.id === payload.listId).items;
      const itemsId = board.lists.findIndex((l) => l.id == payload.listId);
      let updatedItems = items.filter((i) => i.itemId !== payload.itemId);
      board.lists[itemsId].items = updatedItems;
    },
    updateListItem(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const items = board.lists.find((l) => l.id === payload.listId).items;
      let item = items.find((i) => i.itemId == payload.itemId);
      item.name = payload.name;
    },
    reorderListItems(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id == payload.listId);

      list.items = payload.payload;
    },
    reorderList(state, payload) {
      const boardId = state.boards.findIndex((b) => b.id == payload.boardId);
      state.boards[boardId].lists = payload.payload;
    },
    archiveList(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id == payload.listId);
      list.archived = !list.archived;
    },
    setActiveBoard(state, payload) {
      state.activeBoard = payload;
    },
    setActivePage(state, payload) {
      state.activePage = payload;
    },

    // USER
    updateUser(state, p) {
      state.user = p;
    },
    setProfile(state, p) {
      state.profileId = p.id;
      state.profileEmail = p.data().email;
      state.profileFirstName = p.data().firstName;
      state.profileLastName = p.data().lastName;
    },
    changeProfileInfo(state, [key, data]) {
      state[key] = data;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.charAt(0).toUpperCase() +
        state.profileLastName.charAt(0).toUpperCase();
    },
  },
  actions: {
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
    async getBoards({ state }) {
      try {
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
  },
  getters: {
    getBoards(state) {
      return state.boards;
    },
    unarchivedBoards(state) {
      return state.boards.filter((b) => !b.archived);
    },
    archivedBoards(state) {
      return state.boards.filter((b) => b.archived);
    },
    getActivePage(state) {
      return state.activePage;
    },
    getArchivedLists: (state) =>
      state.activeBoard
        ? state.activeBoard.lists.filter((l) => l.archived)
        : [],
  },
});
