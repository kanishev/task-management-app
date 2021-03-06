import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import router from "./router/index";

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
