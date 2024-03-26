<template>
  <v-app>
    <TheHeader @toggle-drawer="toggleDrawer" />
    <TheDrawer
      :drawer="drawer"
      @toggle-drawer="toggleDrawer"
    />
    <v-main
      :style="{
        'background-image':
          activePage == 'Task Page' ? 'url(' + activeImage + ')' : null,
        'background-size': 'cover',
      }"
    >
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import TheDrawer from "../components/TheDrawer.vue";

import { useBoardsStore } from "../stores/boards";
import { mapStores } from "pinia";

export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapStores(useBoardsStore),
    activePage() {
      return this.$route.meta.title;
    },
    activeImage() {
      const board = this.boardsStore.activeBoard;
      if (board && board.image) {
        return board.image;
      }
      return false;
    },
  },
  methods: {
    toggleDrawer(){
      this.drawer = !this.drawer;
    }
  },
  components: { TheHeader, TheDrawer },
};
</script>

<style>
.v-main__wrap {
  overflow-x: auto;
}
</style>
