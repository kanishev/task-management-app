import { createApp } from 'vue';
import { createStore } from './store';
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import App from "./App.vue";

const store = createStore();

const app = createApp({
  vuetify,
  router,
  ...App
});

app.use(store);
app.config.productionTip = false;
app.mount('#app');
