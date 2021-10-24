<template>
  <v-container>
    <h1>TaskPage</h1>

    <TaskList />
  </v-container>
</template>

<script>
import TaskList from "../components/Tasks/TaskList.vue";

export default {
  created() {
    this.$store.commit("setActiveBoard", "some");
    this.$store.commit("setActivePage", "taskPage");
  },
  components: { TaskList },
};
</script>

<style></style>
