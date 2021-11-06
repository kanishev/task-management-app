<template>
  <v-container>
    <v-row mx="2" v-if="unarchivedBoards.length !== 0">
      <h1>Активные доски</h1>
      <v-col
        v-for="board in unarchivedBoards"
        :key="board.id"
        xs="12"
        sm="6"
        md="3"
        xl="3"
      >
        <dashboard-item :board="board"></dashboard-item>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row mx="2" v-if="archivedBoards.length !== 0">
      <h2>Доски в архиве</h2>
      <v-col
        v-for="board in archivedBoards"
        :key="board.id"
        xs="12"
        sm="6"
        md="3"
        xl="3"
      >
        <dashboard-item :board="board"></dashboard-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardItem from "../components/Dashboard/DashboardItem.vue";

export default {
  created() {
    this.$store.commit("setActiveBoard", null);
  },
  computed: {
    unarchivedBoards() {
      console.log(this.$store.getters.unarchivedBoards);
      return this.$store.getters.unarchivedBoards;
    },
    archivedBoards() {
      return this.$store.getters.archivedBoards;
    },
  },
  components: { DashboardItem },
};
</script>

<style></style>
