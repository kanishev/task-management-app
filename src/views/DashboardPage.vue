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

    <v-card
      outlined
      id="preview"
      class="mx-auto my-10 d-flex justify-space-between"
      style="border:none"
    >
      <div>
        <v-card-title class="justify-center text-h4 mb-5">
          Похоже, активных досок пока что нет
        </v-card-title>

        <v-card-subtitle class="text-subtitle-1">
          Создайте свою первую доску прямо сейчас
        </v-card-subtitle>

        <DashboardEdit class="pl-4" color="black" />
      </div>
      <v-img src="../assets/main.png" max-width="700px" height="auto"></v-img>
    </v-card>
  </v-container>
</template>

<script>
import DashboardItem from "../components/Dashboard/DashboardItem.vue";
import DashboardEdit from "../components/Dashboard/DashboardEdit.vue";

export default {
  created() {
    this.$store.commit("setActiveBoard", null);
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    unarchivedBoards() {
      return this.$store.getters.unarchivedBoards;
    },
    archivedBoards() {
      return this.$store.getters.archivedBoards;
    },
  },
  components: { DashboardItem, DashboardEdit },
};
</script>

<style scoped>
@media (max-width: 1000px) {
  #preview {
    flex-wrap: wrap !important;
  }
}
</style>
