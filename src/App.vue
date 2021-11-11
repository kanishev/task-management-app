<template>
  <div class="app-wrapper">
    <v-container v-if="!activeUser && this.$route.name !== 'Auth'">
      <v-skeleton-loader
        v-bind="attrs"
        type="table-heading, list-item-two-line, image, table-tfoots"
      ></v-skeleton-loader>
    </v-container>

    <component v-else :is="layout"> </component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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
      this.$store.commit("updateUser", user);

      if (user) {
        this.$store.dispatch("getUser");
        this.$store.dispatch("getBoards");
      } else if (!user) {
        this.$router.push({ name: "Auth" }).catch(() => {});
      }
    });
  },
  computed: {
    activeUser() {
      return this.$store.state.user;
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
