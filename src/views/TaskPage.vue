<template>
  <v-container>
    <draggable
      v-if="lists.length > 0"
      v-model="lists"
      v-bind="getDragOptions"
      class="d-flex "
    >
      <TaskList
        v-for="(list, idx) in lists"
        :key="idx"
        :list="list"
        :board="getBoard"
      />
    </draggable>

    <v-card
      v-if="lists.length == 0 && !this.isLoading"
      outlined
      id="preview"
      class="mx-auto my-10 d-flex justify-space-between"
      style="border:none"
    >
      <div>
        <v-card-title class="text-h3 mb-5">
          Create your first Task List
        </v-card-title>

        <TasklistEdit class="pl-4" color="black" />
      </div>
      <v-img src="../assets/list.svg" max-width="700px" height="auto"></v-img>
    </v-card>
  </v-container>
</template>

<script>
import TaskList from "../components/Tasks/TaskList.vue";
import TasklistEdit from "../components/Tasks/TaskListEdit.vue";
import Draggable from "vuedraggable";

export default {
  mounted() {
    this.$store.commit("setActivePage", "taskPage");
  },
  beforeDestroy() {
    this.$store.commit("setActiveBoard", this.getBoard);
    this.$store.commit("setActivePage", "default");
  },
  computed: {
    activeBoard() {
      const isActive = this.$store.state.activeBoard;
      return isActive;
    },
    getBoard() {
      const boards = this.$store.state.boards;
      const board = boards.find((b) => b.id == this.$route.params.id);

      if (board) {
        this.$store.commit("setActiveBoard", board);
      }
      return board;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    lists: {
      get() {
        if (!this.getBoard) {
          return [];
        }
        return this.getBoard.lists.filter((l) => !l.archived) || [];
      },
      set(p) {
        this.$store.dispatch("reorderList", {
          boardId: this.$route.params.id,
          payload: p,
        });
      },
    },
    getDragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "board-lists",
      };
    },
  },
  components: { TaskList, Draggable, TasklistEdit },
};
</script>

<style></style>
