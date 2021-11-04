<template>
  <v-container>
    <draggable v-model="lists" v-bind="getDragOptions" class="d-flex ">
      <TaskList
        v-for="(list, idx) in lists"
        :key="idx"
        :list="list"
        :board="getBoard"
      />
    </draggable>
  </v-container>
</template>

<script>
import TaskList from "../components/Tasks/TaskList.vue";
import Draggable from "vuedraggable";

export default {
  mounted() {
    this.$store.commit("setActiveBoard", this.getBoard);
    this.$store.commit("setActivePage", "taskPage");
  },
  beforeDestroy() {
    this.$store.commit("setActivePage", "default");
  },
  computed: {
    getBoard() {
      const boards = this.$store.getters.getBoards;
      return boards.find((b) => b.id == this.$route.params.id);
    },
    lists: {
      get() {
        if (!this.getBoard) {
          return [];
        }
        return this.getBoard.lists.filter((l) => !l.archived) || [];
      },
      set(p) {
        this.$store.commit("reorderList", {
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
