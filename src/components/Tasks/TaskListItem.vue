<template>
  <v-card class="mx-0 px-0" flat>
    <form class="pa-2">
      <v-textarea solo name="input-7-4" label="ss" v-model="name"></v-textarea>
      <v-btn class="mr-4" @click="submit">
        submit
      </v-btn>
      <v-btn>
        clear
      </v-btn>
    </form>
  </v-card>
</template>

<script>
export default {
  props: ["role", "item", "board", "list"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    submit() {
      if (this.role == "create") {
        this.$store.commit("createListItem", {
          name: this.name,
          boardId: this.board.id,
          listId: this.list.id,
        });
      }
    },
  },
};
</script>

<style></style>
