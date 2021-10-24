<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row mx="2">
      <v-col
        v-for="board in activeBoards"
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
    activeBoards() {
      return this.$store.getters.getActiveBoards;
    },
  },
  components: { DashboardItem },
};
</script>

<style></style>
