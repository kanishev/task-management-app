<template>
  <v-app-bar app height="50px" flat color="#4682b4">
    <v-row>
      <v-col cols="2">
        <v-text-field
          solo
          append-icon="mdi-magnify"
          placeholder="Перейти к..."
          dense
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="5" class="text-end ma-auto">
        <v-toolbar-title color>Vue Trello</v-toolbar-title>
      </v-col>

      <v-col cols="5" class="ma-auto">
        <v-row class="justify-end">
          <DashboardEdit />
          <TaskListRestore />
          <TaskListEdit />
        </v-row>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import DashboardEdit from "../components/Dashboard/DashboardEdit.vue";
import TaskListEdit from "../components/Tasks/TaskListEdit.vue";
import TaskListRestore from "../components/Tasks/TaskListRestore.vue";

export default {
  components: { DashboardEdit, TaskListEdit, TaskListRestore },
};
</script>

<style></style>
