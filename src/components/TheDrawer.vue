<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:modelValue="toggleDrawer"
    temporary
  >
    <v-list>
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar
            color="primary"
            height="40px"
            width="40px"
          >
            <span class="white--text text-h6">{{ initials }}</span>
          </v-avatar>
        </template>

        <v-col class="px-0">
          <v-list-item-title
            >{{ firstName }} {{ lastName }}</v-list-item-title
          >
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-col>

      </v-list-item>

      <v-divider></v-divider>

      <v-list-item @click="openModal">
        <template v-slot:prepend>
          <UploadImage class="mr-3" />
        </template>
        <v-list-item-title>Load Image</v-list-item-title>
      </v-list-item>

      <v-list-item @click="goProfile">
        <template v-slot:prepend>
          <div>
            <v-icon class="mr-3">mdi-account</v-icon>
          </div>
        </template>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="signOut">
          Log Out
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import firebase from "firebase/compat/app";
import UploadImage from "./UploadImage.vue";

export default {
  components: { UploadImage },
  props: {
    drawer: {
      type: Boolean,
      default: () => false
    }
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
  },
  methods: {
    goProfile() {
      this.$router.push("/profile");
    },
    uploadImage() {
      this.$store.commit("openModal");
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
    toggleDrawer(){
      this.$emit('toggleDrawer')
    },
    openModal() {
      this.$store.commit("openModal", {
        page: "uploadPage",
        type: "create",
      });
    },
  }
}
</script>

<style>

</style>