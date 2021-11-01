<template>
  <div>
    <v-btn color="primary" class="ml-5" dark @click.stop="dialog = true">
      {{ title }}
    </v-btn>
    <v-dialog v-model="dialog" max-width="490">
      <v-card>
        <v-card-title class="h2">{{ title }}</v-card-title>
        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "page"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
