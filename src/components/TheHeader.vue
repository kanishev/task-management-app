<template>
  <v-app-bar app height="50px" flat color="#4682b4">
    <v-row>
      <v-col cols="2" v-show="activePage == 'default'">
        <v-text-field
          solo
          append-icon="mdi-magnify"
          placeholder="Перейти к..."
          dense
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="5"
        :class="{
          'text-end': activePage == 'default',
          'text-start': activePage !== 'default',
        }"
      >
        <v-toolbar-title color>Vue Trello</v-toolbar-title>
      </v-col>

      <v-col :cols="activePage == 'default' ? '5' : '6'" class="ma-auto">
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
  computed: {
    activePage() {
      return this.$store.getters.getActivePage;
    },
  },
  components: { DashboardEdit, TaskListEdit, TaskListRestore },
};
</script>

<style></style>
