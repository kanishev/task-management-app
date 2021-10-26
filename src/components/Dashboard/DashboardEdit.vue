<template>
  <details-popup
    title="New Board"
    page="dashboard"
    v-show="!this.isBoardActive"
    ref="popup"
    @createBoard="saveBoard"
    @cancleBoard="cancleBoard"
    @updateBoard="updateBoard"
  >
    <template v-slot:content>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-text-field
            class="px-3"
            v-model="board.title"
            label="Введите имя доски"
            :rules="emptyRules"
            required
          ></v-text-field>

          <v-text-field
            class="px-3"
            v-model="board.description"
            :rules="emptyRules"
            label="Введите краткое описание доски"
            required
          ></v-text-field>

          <v-btn color="primary darken-1" text @click="saveBoard">
            Создать
          </v-btn>
        </v-container>
      </v-form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";

export default {
  data() {
    return {
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      board: {
        id: "",
        title: "",
        description: "",
      },
    };
  },
  computed: {
    isBoardActive() {
      return this.$store.state.activeBoard;
    },
  },
  methods: {
    saveBoard() {
      this.$refs.form.validate();
    },
    cancleBoard() {
      this.valid = true;
      this.board.id = "";
      this.board.title = "";
      this.board.description = "";
    },
    updateBoard(updated) {
      if (updated) {
        this.board.title = updated.title;
        this.board.description = updated.description;
      }
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
