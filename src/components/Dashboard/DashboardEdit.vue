<template>
  <details-popup
    title="+ Новая доска"
    page="dashboard"
    v-show="!this.activeBoard"
    ref="popup"
    @createBoard="saveBoard"
    @cancleBoard="cancleBoard"
    @updateModalData="updateBoard"
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
            {{ type == "create" ? "Создать" : "Обновить" }}
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
      type: "create",
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      board: {
        id: "",
        name: "",
        description: "",
        image: null,
      },
    };
  },
  computed: {
    activeBoard() {
      const isActive = this.$store.state.activeBoard;
      return isActive;
    },
    profileId() {
      return this.$store.state.profileId;
    },
  },
  methods: {
    async saveBoard() {
      let isValid = this.$refs.form.validate();
      if (isValid) {
        if (this.type == "create") {
          this.$store.dispatch("saveBoard", {
            id: this.board.id,
            name: this.board.name,
            description: this.board.description,
            image: this.board.image,
            profileId: this.profileId,
          });
        } else if (this.type == "update") {
          console.log("1");
          this.$store.dispatch("updateBoard", {
            id: this.board.id,
            name: this.board.name,
            description: this.board.description,
            image: this.board.image,
            profileId: this.profileId,
          });
        }
        this.$store.commit("closeModal");
      }
    },
    updateBoard(updated) {
      this.type = updated.type;
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
