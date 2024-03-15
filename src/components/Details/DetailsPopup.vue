<template>
  <div>
    <v-icon v-if="type == 'image'" @click.stop="openModal">mdi-image</v-icon>

    <v-btn
      :color="this.color ? this.color : '#ffffff'"
      variant="text"
      :dark="this.color ? false : true"
      @click.stop="openModal"
    >
      {{ title }}
    </v-btn>

    <v-dialog v-model="modal.status" max-width="490">
      <v-card :loading="loading">
        <v-card-title class="h2">{{ title }}</v-card-title>
        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "page", "type", "color", 'loading'],
  data() {
    return {
      modal: {
        status: false,
        page: null,
        type: null,
        board: null,
        lists: null,
      }
    }
  },
  computed: {
  },
  methods: {
    openModal() {
      this.modal = {
        status: true,
        page: this.page,
        type: this.type,
        board: this.board,
        lists: this.lists
      }
    },
    closeModal() {
      this.modal = {
        status: false,
        page: null,
        type: null,
        board: null,
        lists: null
      }
    }
  },
};
</script>

<style></style>
