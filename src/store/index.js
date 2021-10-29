import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { generateId } from "../utlis/generateId";

export default new Vuex.Store({
  state: {
    boards: [],
    activeBoard: null,
    activePage: "default",
    modal: {
      status: false,
      board: null,
      page: null,
      list: null,
    },
  },
  mutations: {
    saveBoard(state, payload) {
      const board = state.boards.find((b) => b.id == payload.id);
      const idx = state.boards.findIndex((b) => b.id === payload.id);

      if (idx !== -1) {
        board.name = payload.name;
        board.description = payload.description;
        state.boards[idx] = board;
      } else {
        const board = {
          id: generateId(),
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
    createTaskList(state, payload) {
      const board = state.boards.find((b) => b.id == payload.boardId);
      const list = board.lists.find((l) => l.id === payload.listId);
      const listIdx = board.lists.findIndex((l) => l.id == payload.listId);

      if (listIdx !== -1) {
        list.name = payload.name;
        state.boards[listIdx].list = list;
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
      const boardId = state.boards.findIndex((b) => b.id == payload.boardId);
      state.boards[boardId].lists = payload.payload;
    },
    setActiveBoard(state, payload) {
      state.activeBoard = payload;
    },
    setActivePage(state, payload) {
      state.activePage = payload;
    },
    closeModal(state) {
      state.modal = {
        status: false,
        board: null,
        page: null,
        list: null,
      };
    },
    openModal(state, p) {
      state.modal = {
        status: true,
        board: p.board,
        page: p.page,
        list: p.list,
      };
    },
    archiveList(state, p) {
      console.log(p);
    },
  },
  actions: {},
  getters: {
    isModalActive(state) {
      return state.modal;
    },
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
  },
});

// boards: [
//   {
//     id: 1,
//     name: "first",
//     description: "Description",
//     lists: [
//       {
//         id: 1,
//         name: "first",
//         archived: false,
//         items: [
//           {
//             id: "1",
//             text: "Build the feature #1",
//           },
//           {
//             id: "2",
//             text: "Build the feature #2",
//           },
//           {
//             id: "3",
//             text: "Build the feature #3",
//           },
//         ],
//       },
//       {
//         id: 2,
//         name: "second",
//         archived: false,
//         items: [
//           {
//             id: "4",
//             text: "Build the feature #1",
//           },
//           {
//             id: "5",
//             text: "Build the feature #2",
//           },
//           {
//             id: "6",
//             text: "Build the feature #3",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "hello",
//     archived: false,
//     description: "Description",
//     lists: [
//       {
//         id: 0,
//         name: "first",
//         archived: false,
//         items: [
//           {
//             id: "1",
//             text: "Build the feature #1",
//           },
//           {
//             id: "2",
//             text: "Build the feature #2",
//           },
//           {
//             id: "3",
//             text: "Build the feature #3",
//           },
//         ],
//       },
//       {
//         id: 1,
//         name: "second",
//         archived: false,
//         items: [
//           {
//             id: "4",
//             text: "Build the feature #1",
//           },
//           {
//             id: "5",
//             text: "Build the feature #2",
//           },
//           {
//             id: "6",
//             text: "Build the feature #3",
//           },
//         ],
//       },
//     ],
//   },
// ],
