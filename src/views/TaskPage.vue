<template>
  <v-container>
    <h1>TaskPage</h1>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.commit("setActiveBoard", "some");
  },
};
</script>

<style></style>
