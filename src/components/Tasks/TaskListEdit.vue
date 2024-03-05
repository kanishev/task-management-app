<template>
  <details-popup
    v-show="this.activeBoard"
    page="taskPage"
    title="New List"
    :color="this.color"
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
            v-model="listForm.name"
            label="List name"
            :rules="emptyRules"
            @keydown.enter.prevent="saveTaskList"
            required
          ></v-text-field>

          <v-btn color="primary darken-1" text @click.prevent="saveTaskList">
            {{ type == "create" ? "Create" : "Update" }}
          </v-btn>
        </v-container>
      </v-form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";

export default {
  props: ["color"],
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
    async saveTaskList() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        if (this.type == "create") {
          this.$store.dispatch("createTaskList", {
            boardId: this.activeBoard.id,
            name: this.listForm.name,
            listId: this.listForm.id,
            archived: false,
            items: [],
          });
        } else if (this.type == "update") {
          this.$store.dispatch("updateTaskList", {
            boardId: this.activeBoard.id,
            name: this.listForm.name,
            archived: false,
            listId: this.listForm.id,
            items: [],
          });
        }
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
