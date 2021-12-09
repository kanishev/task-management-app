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

    <v-card v-if="boards.length == 0">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5">Hello</v-card-title>

          <v-card-subtitle
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa,
            placeat neque. Quis nostrum fugit molestiae odio magni ad non
            architecto aspernatur sint quibusdam, perferendis, maxime quos
            commodi, ea exercitationem qui consectetur voluptatem dolorem ipsam
            doloribus aperiam ut adipisci voluptate? Consequuntur ipsam
            inventore pariatur beatae qui sequi obcaecati quae officia
            maiores.</v-card-subtitle
          >
        </div>

        <v-img class="ma-3" max-width="600px" tile>
          <v-img src="../assets/main.png"></v-img>
        </v-img>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import DashboardItem from "../components/Dashboard/DashboardItem.vue";

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
  components: { DashboardItem },
};
</script>

<style></style>
