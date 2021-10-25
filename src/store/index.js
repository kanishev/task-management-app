import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [
      {
        title: "hi",
        items: [
          {
            title: "h1",
            item: 1,
            text: "",
          },
          {
            title: "h2",
            item: 1,
            text: "",
          },
          {
            title: "h3",
            item: 1,
            text: "",
          },
          {
            title: "h4",
            item: 1,
            text: "",
          },
        ],
      },
      {
        title: "hi 2",
        items: [
          {
            title: "h1",
            item: [1, 2, 3],
          },
        ],
      },
      {
        title: "hi 3",
        items: [
          {
            title: "h1",
            item: [1, 2, 3],
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
    reorderList(state, payload) {
      state.lists.items = payload;
      console.log(state.lists.items);
    },
    reorderList2(state, payload) {
      state.lists = payload;
      console.log(state.lists);
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
    getActiveBoards(state) {
      return state.boards.activeBoard;
    },
    getActivePage(state) {
      return state.activePage;
    },
  },
});
