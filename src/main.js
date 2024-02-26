import { createApp } from 'vue';
import { createStore } from './store';
import { createRouter } from './router';
import vuetify from "./plugins/vuetify";
import App from "./App.vue";

const store = createStore();
const router = createRouter();

const app = createApp({
  vuetify,
  ...App
});

app.use(store);
app.use(router);

app.mount('#app');
