<template>
  <v-container>
    <draggable
      v-model="lists"
      v-bind="getDragOptions"
      class="d-flex "
      v-if="lists.length > 0"
    >
      <TaskList
        v-for="(list, idx) in lists"
        :key="idx"
        :list="list"
        :board="getBoard"
      />
    </draggable>
    <p v-else class="text-h4 pa-4">Активных списков на данный момент нет</p>
  </v-container>
</template>

<script>
import TaskList from "../components/Tasks/TaskList.vue";
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
      const boards = this.$store.getters.getBoards;
      const board = boards.find((b) => b.id == this.$route.params.id);

      if (board) {
        this.$store.commit("setActiveBoard", board);
      }
      return board;
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
  components: { TaskList, Draggable },
};
</script>

<style></style>
