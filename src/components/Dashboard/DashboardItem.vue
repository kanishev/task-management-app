<template>
  <v-card width="300px" class="ma-0">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      class="mb-5"
    ></v-img>

    <v-row class="justify-space-between align-center">
      <v-card-title class="text-body-1">
        Top western road trips
      </v-card-title>

      <v-btn plain>
        <v-icon dark>
          mdi-border-color
        </v-icon>
      </v-btn>
    </v-row>

    <v-card-actions>
      <v-btn color="orange lighten-2" text>
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="orange lighten-2" text>
        Archive
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
