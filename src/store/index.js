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
        console.log(state);
      }
    },
    archiveBoard(state, payload) {
      const board = state.boards.find((b) => b.id == payload.id);
      const idx = state.boards.findIndex((b) => b.id === payload.id);
      board.archived = !board.archived;
      state.boards[idx] = board;

      console.log(state.boards);
    },
    reorderListItems(state, payload) {
      const board = state.boards[payload.boardId - 1];
      const list = board.lists[payload.listId - 1];

      list.items = payload.payload;
    },
    reorderList(state, payload) {
      state.boards[payload.boardId - 1].lists = payload.payload;
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
