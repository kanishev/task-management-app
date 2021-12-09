export default {
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
  message: null,
};
