<template>
  <div>
    <v-app-bar
      app
      flat
      dense
      :color="activeBoardImage ? 'transparent' : '#5CABF3'"
      :style="{
        'backdrop-filter': activeBoardImage ? 'brightness(0.5)' : 'none',
      }"
    >
      <v-row class="justify-space-around align-center">
        <v-col
          cols="1"
          v-show="!dashboardPage"
          color="#fff"
          class="text-center"
        >
          <v-app-bar-nav-icon
            color="#fff"
            @click.stop="toggleDrawer"
          ></v-app-bar-nav-icon>
        </v-col>

        <v-col cols="2" v-show="dashboardPage">
          <v-autocomplete
            v-model="value"
            color="#fff"
            dense
            :items="boardsItems"
            @change="goBoard"
            hide-details
            label="go to the board..."
          ></v-autocomplete>
        </v-col>

        <v-col
          cols="5"
          :class="{
            'text-end': dashboardPage,
            'text-start': !dashboardPage,
          }"
        >
          <v-toolbar-title
            color
            class="title white--text font-italic text-h5 px-2"
            @click="goHome"
          >
            Vuello
          </v-toolbar-title>
        </v-col>

        <v-col :cols="dashboardPage ? '5' : '6'" class="my-auto">
          <v-row class="justify-end">
            <DashboardEdit type="create" />
            <TaskListRestore />
            <TaskListEdit />
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import DashboardEdit from "../components/Dashboard/DashboardEdit.vue";
import TaskListEdit from "../components/Tasks/TaskListEdit.vue";
import TaskListRestore from "../components/Tasks/TaskListRestore.vue";

import { useBoardsStore } from "../stores/boards";
import { mapStores } from 'pinia';

import "firebase/compat/auth";

export default {
  data() {
    return {
      items: ["foo", "bar", "fizz", "buzz"],
      values: ["foo", "bar"],
      value: null,
    };
  },
  computed: {
    ...mapStores(useBoardsStore),
    activeBoardImage() {
      const board = this.boardsStore.activeBoard;
      if (board && board.image) {
        return true;
      }
      return false;
    },
    activePage() {
      return this.$route.meta.title;
    },
    dashboardPage(){
      return this.activePage == 'Dashboard Page'
    },
    boards() {
      return this.boardsStore.boards;
    },
    boardsItems() {
      return this.boards.reduce((acc, b) => [...acc, b.name], []);
    },
  },
  methods: {
    goBoard() {
      const boardId = this.boards.find((b) => b.name == this.value).id;
      this.$router.push("/boards/" + boardId);
    },
    goHome() {
      if (!this.dashboardPage) {
        this.$router.push("/");
      }
    },
    toggleDrawer() {
      this.$emit('toggleDrawer');
    }
  },
  components: { DashboardEdit, TaskListEdit, TaskListRestore },
};
</script>

<style scoped>
.title:hover {
  cursor: pointer;
}
</style>
