import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boards: [
      {
        id: 1,
        name: "first",
        description: "Description",
        lists: [
          {
            id: 1,
            name: "first",
            archived: false,
            items: [
              {
                id: "1",
                text: "Build the feature #1",
              },
              {
                id: "2",
                text: "Build the feature #2",
              },
              {
                id: "3",
                text: "Build the feature #3",
              },
            ],
          },
          {
            id: 2,
            name: "second",
            archived: false,
            items: [
              {
                id: "4",
                text: "Build the feature #1",
              },
              {
                id: "5",
                text: "Build the feature #2",
              },
              {
                id: "6",
                text: "Build the feature #3",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "hello",
        archived: false,
        description: "Description",
        lists: [
          {
            id: 0,
            name: "first",
            archived: false,
            items: [
              {
                id: "1",
                text: "Build the feature #1",
              },
              {
                id: "2",
                text: "Build the feature #2",
              },
              {
                id: "3",
                text: "Build the feature #3",
              },
            ],
          },
          {
            id: 1,
            name: "second",
            archived: false,
            items: [
              {
                id: "4",
                text: "Build the feature #1",
              },
              {
                id: "5",
                text: "Build the feature #2",
              },
              {
                id: "6",
                text: "Build the feature #3",
              },
            ],
          },
        ],
      },
    ],
    activeBoard: null,
    activePage: "default",
    modal: {
      status: false,
      board: null,
      page: null,
    },
  },
  mutations: {
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
      };
    },
    openModal(state, { board, page }) {
      state.modal = {
        status: true,
        board,
        page,
      };
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
    getActivePage(state) {
      return state.activePage;
    },
  },
});
