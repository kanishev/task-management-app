<template>
  <v-container class="flex-column">
    <v-col
      v-if="unarchivedBoards.length !== 0"
      mx="2"
    >
      <h1 class="mb-5">
        Active boards:
      </h1>

      <v-row>
        <v-col
          v-for="board in unarchivedBoards"
          :key="board.id"
          xs="12"
          sm="6"
          md="3"
          xl="3"
        >
          <dashboard-item :board="board" />
        </v-col>
      </v-row>
    </v-col>

    <v-col
      v-if="archivedBoards.length !== 0"
      mx="2"
    >
      <h2 class="mb-5">
        Boards in archive:
      </h2>
      <v-row>
        <v-col
          v-for="board in archivedBoards"
          :key="board.id"
          xs="12"
          sm="6"
          md="3"
          xl="3"
        >
          <dashboard-item :board="board" />
        </v-col>
      </v-row>
    </v-col>

    <v-card
      v-if="!boards.length && !loading"
      id="preview"
      outlined
      class="mx-auto my-10 d-flex justify-space-between"
      style="border:none"
    >
      <div>
        <v-card-title class="text-h3 mb-5">
          Welcome to <i>Vuello!</i>
        </v-card-title>

        <v-card-subtitle class="text-h6">
          Create your first board right now
        </v-card-subtitle>

        <v-card-text class="text-subtitle-1">
          Vuello is a collaboration tool that organizes your projects into
          boards. In one glance, Vuello tells you what's being worked on, who's
          working on what, and where something is in a process
        </v-card-text>

        <DashboardEdit
          class="pl-4"
          color="black"
        />
      </div>
      <v-img
        :src="mainImage"
        max-width="700px"
        height="auto"
      />
    </v-card>
  </v-container>
</template>

<script>
import DashboardItem from "../components/Dashboard/DashboardItem.vue";
import DashboardEdit from "../components/Dashboard/DashboardEdit.vue";
import mainImage from '../assets/main.png';

import { useBoardsStore } from "../stores/boards";
import { mapStores } from 'pinia';

export default {
  data() {
    return {
      mainImage,
      loading: false
    }
  },
  created() {
    this.boardsStore.setActiveBoard(null);
    this.loading = true;
    this.boardsStore.getBoards().then(() => this.loading = false);
  },
  computed: {
    ...mapStores(useBoardsStore),
    boards() {
      return this.boardsStore.boards;
    },
    unarchivedBoards() {
      return this.boardsStore.unarchivedBoards;
    },
    archivedBoards() {
      return this.boardsStore.archivedBoards;
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
