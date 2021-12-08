<template>
  <v-container>
    <v-card width="500px" :loading="loading" class="mx-auto text-center">
      <v-card-text class="text-h4 text-center">Настройки профиля</v-card-text>

      <v-col class="ma-0 pa-0">
        <v-avatar color="primary">
          <span class="white--text text-h5">{{ initials }}</span>
        </v-avatar>
      </v-col>
      <v-card-text class="admin-badge text-р3">
        {{ this.$store.state.profileFirstName }}
        {{ this.$store.state.profileLastName }}</v-card-text
      >

      <v-divider></v-divider>

      <v-col class="ma-0 pa-0">
        <v-text-field
          label="Имя"
          filled
          hide-details
          v-model="firstName"
        ></v-text-field>
      </v-col>

      <v-col class="ma-0 pa-0">
        <v-text-field
          label="Фаимлия"
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
          >Сохранить изменения</v-btn
        >
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setActivePage", "profilePage");
  },
  computed: {
    initials() {
      return this.$store.state.profileInitials;
    },
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(p) {
        this.$store.commit("changeProfileInfo", ["profileFirstName", p]);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(p) {
        this.$store.commit("changeProfileInfo", ["profileLastName", p]);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
    loading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateUserProfile");
    },
  },
};
</script>

<style></style>
