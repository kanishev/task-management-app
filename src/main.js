import { createApp } from 'vue';
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import router from "./router/index";
import App from "./App.vue";

const app = createApp({
  vuetify,
  router,
  store,
  ...App
});

app.config.productionTip = false;
app.mount('#app');
