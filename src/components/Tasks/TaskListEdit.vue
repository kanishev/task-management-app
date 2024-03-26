<template>
  <details-popup
    v-show="activeBoard"
    page="taskPage"
    title="New List"
    :color="color"
    :loading="loading"
    ref="popup"
    @create-board="saveBoard"
    @cancle-board="cancleBoard"
    @update-modal-data="updateBoard"
  >
    <template #default>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-container>
          <v-text-field
            v-model="listForm.name"
            class="px-3"
            label="List name"
            :rules="emptyRules"
            required
            @keydown.enter.prevent="saveTaskList"
          />

          <v-btn
            color="primary darken-1"
            text
            @click.prevent="saveTaskList"
          >
            {{ type == "create" ? "Create" : "Update" }}
          </v-btn>
        </v-container>
      </v-form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";
import { useBoardsStore } from "../../stores/boards";
import { useTasksStore } from "../../stores/tasks";
import { mapStores } from 'pinia';

export default {
  props: ["color"],
  data() {
    return {
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      listForm: {
        id: "",
        name: "",
      },
      type: "create",
      loading: false
    };
  },
  created() {
    this.boardsStore.setActiveBoard(this.activeBoard);
  },
  computed: {
    ...mapStores(useBoardsStore, useTasksStore),
    activeBoard() {
      return this.boardsStore.activeBoard;
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
          this.loading = true;
          await this.tasksStore.createTaskList({
            boardId: this.activeBoard.id,
            name: this.listForm.name,
            listId: this.listForm.id,
            archived: false,
            items: [],
          })
          this.loading = false;
        } else if (this.type == "update") {
          this.loading = true;
          await this.tasksStore.updateTaskList({
            boardId: this.activeBoard.id,
            name: this.listForm.name,
            archived: false,
            listId: this.listForm.id,
            items: [],
          })
          this.loading = false;
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
