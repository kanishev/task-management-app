<template>
  <v-app>
    <TheHeader @toggleDrawer="toggleDrawer"/>
    <TheDrawer @toggleDrawer="toggleDrawer" :drawer="drawer" />
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
import TheDrawer from "../components/TheDrawer.vue";

export default {
  data() {
    return {
      drawer: false
    }
  },
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
