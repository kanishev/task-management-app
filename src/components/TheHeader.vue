<template>
  <div>
    <v-app-bar app height="50px" flat color="#4682b4">
      <v-row class="justify-space-around align-center">
        <v-col cols="1" v-show="activePage !== 'default'">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-col>

        <v-col cols="2" v-show="activePage == 'default'">
          <v-autocomplete
            v-model="value"
            :items="boardsItems"
            @change="goRoute"
            hide-details
            label="перейти к доске ..."
          ></v-autocomplete>
        </v-col>

        <v-col
          cols="5"
          :class="{
            'text-end': activePage == 'default',
            'text-start': activePage !== 'default',
          }"
        >
          <v-toolbar-title color>
            Vue Trello
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

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      v-show="activePage !== 'default'"
    >
      <v-list>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="uploadImage">
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <UploadImage />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import DashboardEdit from "../components/Dashboard/DashboardEdit.vue";
import TaskListEdit from "../components/Tasks/TaskListEdit.vue";
import TaskListRestore from "../components/Tasks/TaskListRestore.vue";
import UploadImage from "../components/UploadImage.vue";

export default {
  data() {
    return {
      drawer: false,
      group: null,
      items: ["foo", "bar", "fizz", "buzz"],
      values: ["foo", "bar"],
      value: null,
    };
  },
  computed: {
    activePage() {
      return this.$store.getters.getActivePage;
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
    goRoute() {
      const boardId = this.boards.find((b) => b.name == this.value).id;
      this.$router.push("/boards/" + boardId);
    },
    goHome() {
      this.$router.push("/dashboard");
    },
    uploadImage() {
      this.$store.commit("openModal");
    },
  },
  components: { DashboardEdit, TaskListEdit, TaskListRestore, UploadImage },
};
</script>

<style></style>
