<template>
  <v-container>
    <v-card color="#4682b4" width="600px" class="ma-auto" :loading="isLoading">
      <template v-slot:progress>
        <v-progress-linear
          color="#ffffff"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-h2 white--text">
          Vuello
        </h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="#fff" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-alert prominent type="error" v-if="message">
          {{ message }}
        </v-alert>

        <v-tab-item v-for="item in items" :key="item">
          <v-card color="#fff" flat>
            <component :is="item"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Login from "../components/Auth/AuthLogin.vue";
import Register from "../components/Auth/AuthRegister.vue";
import Reset from "../components/Auth/AuthReset.vue";

export default {
  data() {
    return {
      page: "Login",
      tab: null,
      items: ["Login", "Register", "Reset"],
    };
  },
  methods: {
    togglePage(p) {
      this.page = p;
    },
  },
  computed: {
    authPage() {
      return this.page;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    message() {
      return this.$store.state.message;
    },
  },
  components: { Login, Register, Reset },
};
</script>

<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
