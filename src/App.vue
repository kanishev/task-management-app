<template>
  <div class="app-wrapper">
    <component :is="layout"> </component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name: "App",
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);

      if (user) {
        this.$store.dispatch("getUser");
      }
    });

    console.log("1");
    this.$store.dispatch("getBoards");
  },
  data: () => ({
    //
  }),
  computed: {
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
