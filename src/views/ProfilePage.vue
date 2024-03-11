<template>
  <v-container>
    <v-card width="500px" class="mx-auto text-center">
      <v-card-text class="text-h4 text-center">Profile settings</v-card-text>

      <v-col class="ma-0 pa-0">
        <v-avatar color="primary">
          <span class="white--text text-h5">{{ initials }}</span>
        </v-avatar>
      </v-col>
      <v-card-text class="admin-badge text-р3">
        {{ firstName }} {{ lastName }}
      </v-card-text>

      <v-divider></v-divider>

      <v-col class="ma-0 pa-0">
        <v-text-field
          label="First Name"
          filled
          hide-details
          v-model="firstName"
        ></v-text-field>
      </v-col>

      <v-col class="ma-0 pa-0">
        <v-text-field
          label="Second Name"
          filled
          hide-details
          v-model="lastName"
        ></v-text-field>
      </v-col>

      <v-col class="ma-0 pa-0">
        <v-text-field
          disabled
          label="Email"
          filled
          hide-details
          v-model="email"
        ></v-text-field>
      </v-col>

      <v-col class="pa-4">
        <v-btn @click="updateProfile" class="d-block ma-auto"
          >Save changes</v-btn
        >
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import { useUserStore } from "../stores/user";
import { mapStores } from 'pinia';

export default {
  mounted() {
    this.$store.commit("setActivePage", "profilePage");
  },
  beforeUnmount() {
    this.$store.commit("setActivePage", "default");
  },
  computed: {
    ...mapStores(useUserStore),
    initials() {
      return this.userStore.profileInitials;
    },
    firstName: {
      get() {
        return this.userStore.profileFirstName;
      },
      set(p) {
        this.userStore.changeProfileInfo("profileFirstName", p);
      },
    },
    lastName: {
      get() {
        return this.userStore.profileLastName;
      },
      set(p) {
        this.userStore.changeProfileInfo("profileLastName", p);
      },
    },
    email() {
      return this.userStore.profileEmail;
    }
  },
  methods: {
    updateProfile() {
      this.userStore.updateUserProfile();
    },
  },
};
</script>

<style></style>
