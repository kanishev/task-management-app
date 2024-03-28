<template>
  <v-navigation-drawer
    :model-value="drawer"
    temporary
    @update:model-value="toggleDrawer"
  >
    <v-list>
      <v-list-item>
        <template #prepend>
          <v-avatar
            color="primary"
            height="40px"
            width="40px"
          >
            <span class="white--text text-h6">{{ initials }}</span>
          </v-avatar>
        </template>

        <v-col class="px-0">
          <v-list-item-title>
            {{ firstName }} {{ lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-col>
      </v-list-item>

      <v-divider />

      <v-list-item>
        <template #prepend>
          <UploadImage class="mr-3" />
        </template>
      </v-list-item>

      <v-list-item @click="goProfile">
        <template #prepend>
          <div>
            <v-icon class="mr-3">
              mdi-account
            </v-icon>
          </div>
        </template>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn
          block
          @click="signOut"
        >
          Log Out
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import firebase from "firebase/compat/app";
import UploadImage from "./UploadImage.vue";

import { useUserStore } from "../stores/user";
import { mapStores } from 'pinia';

export default {
  components: { UploadImage },
  props: {
    drawer: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    ...mapStores(useUserStore),
    initials() {
      return this.userStore.profileInitials;
    },
    email() {
      return this.userStore.profileEmail;
    },
    firstName() {
      return this.userStore.profileFirstName;
    },
    lastName() {
      return this.userStore.profileLastName;
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
  }
}
</script>

<style>

</style>