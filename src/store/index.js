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

    // Profile
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
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
          archived: false,
        };
        state.boards.push(board);
      }
    },
    archiveBoard(state, payload) {
      const board = state.boards.find((b) => b.id == payload.id);
      const idx = state.boards.findIndex((b) => b.id === payload.id);
      board.archived = !board.archived;
      state.boards[idx] = board;

      console.log(state.boards);
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
          id: generateId(),
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
        id: generateId(),
        name: payload.name,
      };

      list.items.push(item);
    },
    removeListItem(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const items = board.lists.find((l) => l.id === payload.listId).items;
      const itemsId = board.lists.findIndex((l) => l.id == payload.listId);
      let updatedItems = items.filter((i) => i.id !== payload.itemId);
      board.lists[itemsId].items = updatedItems;

      console.log(payload);
    },
    updateListItem(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const items = board.lists.find((l) => l.id === payload.listId).items;
      let item = items.find((i) => i.id == payload.itemId);

      item.name = payload.name;
    },
    reorderListItems(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id == payload.listId);

      list.items = payload.payload;
    },
    reorderList(state, payload) {
      console.log(payload);
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
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName
          .match(/(\b\S)?/g)
          .join("")
          .toUpperCase() +
        state.profileLastName
          .match(/(\b\S)?/g)
          .join("")
          .toUpperCase();
    },
  },
  actions: {
    async saveBoard({ commit }, payload) {
      console.log(payload);
      const dataBase = await db.collection("boards").doc();

      await dataBase.set({
        boardId: dataBase.id,
        boardName: payload.name,
        boardDescription: payload.description,
        boardImage: payload.image,
        lists: [],
        archived: false,
      });

      commit("saveBoard", { boardId: dataBase.id, ...payload });
    },
    async reorderList({ commit }, { boardId, payload }) {
      commit("reorderList", { boardId, payload });

      const dataBase = await db.collection("boards").doc(boardId);
      await dataBase.update({
        lists: payload,
      });
    },
    async getUser({ commit }) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfile", dbResults);
      commit("setProfileInitials");
    },
    async updateUserProfile(ctx) {
      const dataBase = await db.collection("users").doc(ctx.state.profileId);
      await dataBase.update({
        firstName: ctx.state.profileFirstName,
        lastName: ctx.state.profileLastName,
      });
      ctx.commit("setProfileInitials");
    },
    async getBoards({ state }) {
      const dataBase = await db.collection("boards");
      const dbResults = await dataBase.get();

      dbResults.forEach((doc) => {
        if (!state.boards.some((b) => b.id == doc.id)) {
          const board = {
            id: doc.data().boardId,
            name: doc.data().boardName,
            description: doc.data().description,
            lists: doc.data().lists,
            archived: doc.data().archived,
          };

          state.boards.push(board);
        }
      });
    },
    async createTaskList({ commit }, payload) {
      const dataBase = db.collection("boards").doc(payload.boardId);
      const board = await dataBase.get();

      const list = {
        id: dataBase.id,
        ...payload,
      };

      await dataBase.update({
        lists: [...board.data().lists, list],
      });

      commit("createTaskList", list);
    },
    async createListItem({ commit }, payload) {
      commit("createListItem", payload);

      const dataBase = db.collection("boards").doc(payload.boardId);
      const board = await dataBase.get();

      const lists = board.data().lists;
      const list = lists.find((l) => l.id == payload.listId);
      const listId = board
        .data()
        .lists.findIndex((l) => l.id == payload.listId);

      list.items.push({ name: payload.name });

      lists[listId] = list;

      await dataBase.update({
        lists: [...lists],
      });
    },
    async reorderListItems({ commit }, payload) {
      commit("reorderListItems", payload);

      const dataBase = db.collection("boards").doc(payload.boardId);
      const board = await dataBase.get();
      const lists = board.data().lists;
      const list = lists.find((l) => l.id == payload.listId);
      const listId = board
        .data()
        .lists.findIndex((l) => l.id == payload.listId);

      list.items = [...payload.payload];

      lists[listId] = list;

      await dataBase.update({
        lists: [...lists],
      });
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
