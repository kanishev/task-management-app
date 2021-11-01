export default {
  state: {},
  mutations: {
    someMutation(state) {
      console.log(state);
    },
  },
  actions: {
    someAction({ commit }) {
      commit("someMutation", null, { root: true }); // -> 'someMutation'
    },
  },
  getters: {},
};
