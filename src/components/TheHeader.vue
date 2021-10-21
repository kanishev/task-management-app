<template>
  <v-app-bar app height="50px" flat color="#4682b4">
    <v-row>
      <v-col cols="2">
        <v-text-field
          solo
          append-icon="mdi-magnify"
          placeholder="Перейти к..."
          dense
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="8" class="text-center">
        <v-toolbar-title color>Vue Trello</v-toolbar-title>
      </v-col>

      <v-col cols="2" class="text-end">
        <v-btn color="#fff" depressed elevation="2">Создать</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>
