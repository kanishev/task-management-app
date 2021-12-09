export default {
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
  setMessage(state, payload) {
    state.message = payload;

    setTimeout(() => {
      state.message = null;
    }, 3000);
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
};
