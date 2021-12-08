<template>
  <v-container>
    <v-col mx="2" v-if="unarchivedBoards.length !== 0">
      <h1 class="mb-5">Активные доски:</h1>

      <v-row>
        <v-col
          v-for="board in unarchivedBoards"
          :key="board.id"
          xs="12"
          sm="6"
          md="3"
          xl="3"
        >
          <dashboard-item :board="board"></dashboard-item>
        </v-col>
      </v-row>
    </v-col>

    <v-col mx="2" v-if="archivedBoards.length !== 0">
      <h2 class="mb-5">Доски в архиве:</h2>
      <v-row>
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
    </v-col>
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
