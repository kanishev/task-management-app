<template>
  <div>
    <v-btn color="primary" class="ml-5" dark @click.stop="openModal">
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
  computed: {
    dialog: {
      get() {
        const modal = this.$store.getters.isModalActive;
        this.$emit("updateBoard", modal);
        return modal.status && modal.page === this.page;
      },
      set() {
        this.$store.commit("closeModal");
      },
    },
  },
  methods: {
    cancleBoard() {
      this.$emit("cancleBoard");
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
