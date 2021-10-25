<template>
  <v-container>
    <h1>TaskPage</h1>
    <draggable
      v-model="lists"
      v-bind="getDragOptions"
      class="d-flex justify-space-around"
    >
      <TaskList v-for="(list, idx) in lists" :key="idx" :list="list" />
    </draggable>
  </v-container>
</template>

<script>
import TaskList from "../components/Tasks/TaskList.vue";
import Draggable from "vuedraggable";

export default {
  created() {
    this.$store.commit("setActiveBoard", "some");
    this.$store.commit("setActivePage", "taskPage");
  },
  computed: {
    lists: {
      get() {
        return this.$store.state.lists;
      },
      set(p) {
        this.$store.commit("reorderList2", p);
      },
    },
    getDragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "kanban-board-lists",
      };
    },
  },
  components: { TaskList, Draggable },
};
</script>

<style></style>
