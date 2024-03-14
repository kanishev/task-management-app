<template>
  <v-card width="300px" class="ma-0">
    <v-img
      :src="this.board.image"
      height="200px"
      :style="{
        background:
          'linear-gradient(90deg, rgba(173,214,255,1) 0%, rgba(123,192,255,0.8046568969384629) 100%)',
      }"
      class="mb-5"
    ></v-img>

    <v-card-actions class="justify-space-between align-center">
      <v-card-title class="text-body-1">
        {{ this.board.name }}
      </v-card-title>

      <DashboardEdit type="update" color="dark" />
    </v-card-actions>

    <v-card-subtitle class="px-6">
      {{ this.board.description }}
    </v-card-subtitle>

    <v-card-actions v-if="!board.archived">
      <router-link :to="'boards/' + board.id" class="link">
        <v-btn color="primary lighten-2" text>Open </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn color="primary lighten-2" text @click="archiveBoard">
        Archive
      </v-btn>
    </v-card-actions>

    <v-card-actions v-else>
      <v-btn color="primary lighten-2" text @click="archiveBoard">
        Recover
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useBoardsStore } from "../../stores/boards";
import { mapStores } from 'pinia';
import DashboardEdit from "./DashboardEdit.vue";

export default {
  props: ["board"],
  components: { DashboardEdit },
  methods: {
    archiveBoard() {
      this.boardsStore.archiveBoard({
        id: this.board.id,
        archived: this.board.archived,
      })
    },
  },
  computed: {
    ...mapStores(useBoardsStore)
  }
};
</script>

<style>
.link {
  text-decoration: none;
}
</style>
