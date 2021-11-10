<template>
  <div>
    <v-app-bar app height="55px" flat dense color="#4682b4">
      <v-row class="justify-space-around align-center">
        <v-col
          cols="1"
          v-show="activePage !== 'default'"
          color="#fff"
          class="text-center"
        >
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-col>

        <v-col cols="2" v-show="activePage == 'default'">
          <v-autocomplete
            v-model="value"
            color="#fff"
            dense
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
          <v-toolbar-title
            color
            class="title white--text font-italic text-h5"
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

      <v-navigation-drawer
        height="100vh"
        v-model="drawer"
        absolute
        bottom
        temporary
      >
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item class="px-2">
              <v-avatar color="primary" class="mr-3">
                <span class="white--text text-h6">{{ initials }}</span>
              </v-avatar>

              <v-list-content>
                <v-list-item-title
                  >{{ firstName }} {{ lastName }}</v-list-item-title
                >
                <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
              </v-list-content>
              <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item class="align-center" @click="openModal">
              <UploadImage class="mr-3" />
              <v-list-item-title>Загрузить изображение</v-list-item-title>
            </v-list-item>

            <v-list-item @click="goProfile">
              <v-icon class="mr-3">mdi-account</v-icon>
              <v-list-item-title>Профиль</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-list-tile-action>
          <div class="pa-2">
            <v-btn block @click="signOut">
              Выйти из системы
            </v-btn>
          </div>
        </v-list-tile-action>
      </v-navigation-drawer>
    </v-app-bar>
  </div>
</template>

<script>
import DashboardEdit from "../components/Dashboard/DashboardEdit.vue";
import TaskListEdit from "../components/Tasks/TaskListEdit.vue";
import TaskListRestore from "../components/Tasks/TaskListRestore.vue";
import UploadImage from "../components/UploadImage.vue";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  data() {
    return {
      group: null,
      drawer: false,
      items: ["foo", "bar", "fizz", "buzz"],
      values: ["foo", "bar"],
      value: null,
    };
  },
  computed: {
    initials() {
      return this.$store.state.profileInitials;
    },
    email() {
      return this.$store.state.profileEmail;
    },
    firstName() {
      return this.$store.state.profileFirstName;
    },
    lastName() {
      return this.$store.state.profileLastName;
    },
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
      if (this.activePage !== "default") {
        this.$router.push("/");
      }
    },
    goProfile() {
      this.$router.push("/profile");
    },
    uploadImage() {
      this.$store.commit("openModal");
    },
    openModal() {
      this.$store.commit("openModal", {
        page: "uploadPage",
        type: "create",
      });
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
  },
  components: { DashboardEdit, TaskListEdit, TaskListRestore, UploadImage },
};
</script>

<style></style>
