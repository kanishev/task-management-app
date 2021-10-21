<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
export default {
  components: { TheHeader },
};
</script>

<style></style>
