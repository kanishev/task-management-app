<template>
  <v-container>
    <v-card
      color="#4682b4"
      width="600px"
      class="ma-auto"
      :loading="loading"
    >
      <template #progress>
        <v-progress-linear
          color="#ffffff"
          height="4"
          indeterminate
        />
      </template>

      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-h2 white--text">
          Vuello
        </h1>
      </v-card-title>

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="#fff"
        grow
      >
        <v-tab
          v-for="item in items"
          :key="item"
          :value="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-alert
          v-if="message"
          prominent
          type="error"
        >
          {{ message }}
        </v-alert>

        <v-window-item
          v-for="item in items"
          :key="item"
          :value="item"
        >
          <v-card
            color="#fff"
            flat
          >
            <component
              :is="item"
              v-model:loading="loading"
              v-model:message="message"
            />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>

<script>
import Login from "../components/Auth/AuthLogin.vue";
import Register from "../components/Auth/AuthRegister.vue";
import Reset from "../components/Auth/AuthReset.vue";

export default {
  components: { Login, Register, Reset },
  data() {
    return {
      tab: null,
      items: ["Login", "Register", "Reset"],
      loading: false,
      message: ''
    };
  },
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
