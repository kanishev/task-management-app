<template>
  <details-popup
    v-show="this.activeBoard"
    page="taskPage"
    title="Новый список"
    ref="popup"
    @createBoard="saveBoard"
    @cancleBoard="cancleBoard"
    @updateBoard="updateBoard"
  >
    <template>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-text-field
            class="px-3"
            v-model="listForm.name"
            label="Введите название списка"
            :rules="emptyRules"
            @keydown.enter.prevent="saveTaskList"
            required
          ></v-text-field>

          <v-btn color="primary darken-1" text @click.prevent="saveTaskList">
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
  created() {
    this.$store.commit("setActiveBoard", this.activeBoard);
  },
  data() {
    return {
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      listForm: {
        id: "",
        name: "",
      },
      type: "create",
    };
  },
  computed: {
    activeBoard() {
      return this.$store.state.activeBoard;
    },
  },
  methods: {
    saveBoard() {
      this.$refs.form.validate();
    },
    saveTaskList() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$store.commit("createTaskList", {
          boardId: this.activeBoard.id,
          listId: this.listForm.id,
          name: this.listForm.name,
        });
        this.$store.commit("closeModal");
      }
    },
    cancleBoard() {
      this.valid = true;
      this.listForm.id = "";
      this.listForm.name = "";
    },
    updateBoard(updated) {
      this.type = updated.type;

      if (this.type == "create") {
        this.cancleBoard();
      } else if (updated.list && this.type !== "create") {
        this.listForm.name = updated.list.name;
        this.listForm.id = updated.list.id;
      }
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
