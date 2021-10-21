<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row mx="2">
      <v-col v-for="n in 10" :key="n" xs="12" sm="6" md="3" xl="3">
        <dashboard-item></dashboard-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardItem from "../components/Dashboard/DashboardItem.vue";

export default {
  components: { DashboardItem },
};
</script>

<style></style>
