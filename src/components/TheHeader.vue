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
          v-show="activePage !== 'default'"
          color="#fff"
          class="text-center"
        >
          <v-app-bar-nav-icon
            color="#fff"
            @click.stop="toggleDrawer"
          ></v-app-bar-nav-icon>
        </v-col>

        <v-col cols="2" v-show="activePage == 'default'">
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
            'text-end': activePage == 'default',
            'text-start': activePage !== 'default',
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

        <v-col :cols="activePage == 'default' ? '5' : '6'" class="my-auto">
          <v-row class="justify-end">
            <DashboardEdit />
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
    activeBoardImage() {
      const board = this.$store.state.activeBoard;
      if (board && board.image) {
        return true;
      }
      return false;
    },
    activePage() {
      return this.$store.state.activePage;
    },
    boards() {
      this.$store.getters.someGetter;
      return this.$store.state.boards;
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
      if (this.activePage !== "default") {
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
