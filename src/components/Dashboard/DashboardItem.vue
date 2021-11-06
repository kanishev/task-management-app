<template>
  <v-card width="300px" class="ma-0">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      class="mb-5"
    ></v-img>

    <v-row class="justify-space-between align-center">
      <v-card-title class="text-body-1">
        {{ this.board.name }}
      </v-card-title>

      <v-btn plain @click="editBoard()">
        <v-icon dark>
          mdi-border-color
        </v-icon>
      </v-btn>
    </v-row>

    <v-card-subtitle>
      {{ this.board.description }}
    </v-card-subtitle>

    <v-card-actions v-if="!board.archived">
      <router-link :to="'boards/' + board.id" class="link">
        <v-btn color="primary lighten-2" text>Перейти </v-btn></router-link
      >

      <v-spacer></v-spacer>

      <v-btn color="primary lighten-2" text @click="archiveBoard">
        В архив
      </v-btn>
    </v-card-actions>

    <v-card-actions v-else>
      <v-btn color="primary lighten-2" text @click="archiveBoard">
        Восстановить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["board"],
  methods: {
    editBoard() {
      this.$store.commit("openModal", {
        page: "dashboard",
        board: this.board,
        type: "update",
      });
    },
    archiveBoard() {
      this.$store.dispatch("archiveBoard", {
        id: this.board.id,
        archived: this.board.archived,
      });
    },
  },
};
</script>

<style>
.link {
  text-decoration: none;
}
</style>
