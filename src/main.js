import { createApp } from 'vue';
import { createStore } from './store';
import { createPinia } from 'pinia';
import { createRouter } from './router';
import App from "./App.vue";

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
const store = createStore();
const router = createRouter();

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount('#app');
