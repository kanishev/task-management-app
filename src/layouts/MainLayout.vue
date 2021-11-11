<template>
  <v-app>
    <TheHeader />
    <v-main
      :style="{
        'background-image':
          activePage == 'taskPage' ? 'url(' + activeImage + ')' : null,
        'background-size': 'cover',
      }"
    >
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
export default {
  computed: {
    activePage() {
      return this.$store.state.activePage;
    },
    activeImage() {
      const board = this.$store.state.activeBoard;
      if (board && board.image) {
        return board.image;
      }
      return false;
    },
  },
  components: { TheHeader },
};
</script>

<style>
.v-main__wrap {
  overflow-x: auto;
}
</style>
