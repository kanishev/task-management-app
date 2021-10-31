<template>
  <details-popup
    title="+ Новая доска"
    page="dashboard"
    v-show="!this.activeBoard"
    ref="popup"
    @createBoard="saveBoard"
    @cancleBoard="cancleBoard"
    @updateBoard="updateBoard"
  >
    <template v-slot>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-text-field
            class="px-3"
            v-model="board.name"
            label="Введите имя доски"
            :rules="emptyRules"
            @keyup.enter="saveBoard"
            required
          ></v-text-field>

          <v-text-field
            class="px-3"
            v-model="board.description"
            :rules="emptyRules"
            label="Введите краткое описание доски"
            @keyup.enter="saveBoard"
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
  created() {
    this.$store.commit("setActivePage", "default");
  },
  data() {
    return {
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      board: {
        id: "",
        name: "",
        description: "",
      },
    };
  },
  computed: {
    activeBoard() {
      const isActive = this.$store.state.activeBoard;

      if (!isActive) {
        this.$store.commit("setActivePage", "default");
      }
      return isActive;
    },
  },
  methods: {
    saveBoard() {
      let isValid = this.$refs.form.validate();
      if (isValid) {
        this.$store.commit("saveBoard", {
          id: this.board.id,
          name: this.board.name,
          description: this.board.description,
        });

        this.$store.commit("closeModal");
      }
    },
    updateBoard(updated) {
      if (updated.type == "create") {
        this.cancleBoard();
      } else if (updated.board) {
        this.board.id = updated.board.id;
        this.board.name = updated.board.name;
        this.board.description = updated.board.description;
      }
    },
    cancleBoard() {
      this.valid = true;
      this.board.id = "";
      this.board.name = "";
      this.board.description = "";
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
