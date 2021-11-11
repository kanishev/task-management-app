export default {
  unarchivedBoards(state) {
    return state.boards.filter((b) => !b.archived);
  },
  archivedBoards(state) {
    return state.boards.filter((b) => b.archived);
  },
  getArchivedLists: (state) =>
    state.activeBoard ? state.activeBoard.lists.filter((l) => l.archived) : [],
};
