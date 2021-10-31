<template>
  <v-card class="mx-0 px-0" flat>
    <form class="pa-2">
      <v-textarea
        solo
        name="input-7-4"
        :label="name ? name : 'Придумайте название'"
        v-model="name"
      ></v-textarea>
      <v-btn class="mr-4" @click.prevent="addListItem">
        {{ type == "edit" ? "Обновить" : "Добавить" }}
      </v-btn>
      <v-btn @click.prevent="removeListItem" v-if="type !== 'create'">
        Удалить
      </v-btn>
    </form>
  </v-card>
</template>

<script>
export default {
  props: ["type", "item", "board", "list"],
  data() {
    return {
      name: this.item ? this.item.name : "",
    };
  },
  methods: {
    addListItem() {
      if (this.type == "create") {
        this.$store.commit("createListItem", {
          name: this.name,
          boardId: this.board.id,
          listId: this.list.id,
        });
      } else {
        this.$store.commit("updateListItem", {
          name: this.name,
          boardId: this.board.id,
          listId: this.list.id,
          itemId: this.item.id,
        });
      }
    },
    removeListItem() {
      this.$store.commit("removeListItem", {
        name: this.name,
        boardId: this.board.id,
        listId: this.list.id,
        itemId: this.item.id,
      });
    },
  },
};
</script>

<style></style>
