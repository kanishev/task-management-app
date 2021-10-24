import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeBoard: null,
    modal: {
      status: false,
      board: null,
      page: null,
    },
    boards: {
      activeBoard: [
        {
          title: "hello",
          description: "Description",
        },
        {
          title: "hello",
          description: "Description",
        },
        {
          title: "hello",
          description: "Description",
        },
        {
          title: "hello",
          description: "Description",
        },
        {
          title: "hello",
          description: "Description",
        },
      ],
      archivedBoards: [],
    },
  },
  mutations: {
    setActiveBoard(state, payload) {
      state.activeBoard = payload;
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
    getActiveBoards(state) {
      return state.boards.activeBoard;
    },
  },
});
