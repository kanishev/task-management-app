<template>
  <div class="app-wrapper">
    <v-container v-if="!activeUser && $route.name !== 'Auth'">
      <v-skeleton-loader
        v-bind="attrs"
        type="table"
      />
    </v-container>

    <component
      :is="layout"
      v-else
    />
  </div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { useUserStore } from "./stores/user";
import { useBoardsStore } from "./stores/boards";
import { mapStores } from 'pinia';

export default {
  name: "App",
  data() {
    return {
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.userStore.updateUser(user);

      if (user) {
        this.userStore.getUser();
      } else {
        this.$router.push({ name: "Auth" }).catch(() => {});
      }
    });
  },
  computed: {
    ...mapStores(useUserStore, useBoardsStore),
    activeUser() {
      return this.userStore.user;
    },
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: { EmptyLayout, MainLayout },
};
</script>

<style>
.link {
  text-decoration: none;
  color: aliceblue;
}
</style>
