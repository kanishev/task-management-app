<template>
  <div>
    <v-btn color="primary" class="ml-5" dark @click.stop="openModal">
      {{ title }}
    </v-btn>
    <v-dialog v-model="modal" max-width="490">
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
  computed: {
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
    close() {
      this.$store.commit("closeModal");
    },
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
