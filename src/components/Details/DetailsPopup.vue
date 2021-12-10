<template>
  <div>
    <v-btn
      v-if="type !== 'image'"
      :color="this.color ? this.color : '#ffffff'"
      text
      outlined
      rounded
      :dark="this.color ? false : true"
      @click.stop="openModal"
    >
      {{ title }}
    </v-btn>

    <v-icon v-if="type == 'image'" @click.stop="openModal">mdi-image</v-icon>

    <v-dialog v-model="modal" max-width="490">
      <v-card :loading="isLoading">
        <v-card-title class="h2">{{ title }}</v-card-title>
        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "page", "type", "color"],
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    modal: {
      get() {
        const modal = this.$store.state.modal;
        if (!modal) {
          return false;
        }
        this.$emit("updateModalData", modal);
        return modal.status && modal.page == this.page;
      },
      set() {
        this.$store.commit("closeModal");
      },
    },
  },
  methods: {
    openModal() {
      this.$store.commit("openModal", {
        page: this.page,
        type: "create",
      });
    },
  },
};
</script>

<style></style>
