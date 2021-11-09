<template>
  <v-card class="mx-0 px-0" flat>
    <form class="pa-2">
      <v-textarea
        solo
        name="input-7-4"
        :label="name ? name : 'Придумайте задачу'"
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
        this.$store.dispatch("createListItem", {
          name: this.name,
          boardId: this.board.id,
          listId: this.list.id,
        });
      } else {
        console.log(this.item);
        this.$store.dispatch("updateListItem", {
          name: this.name,
          boardId: this.board.id,
          listId: this.list.id,
          itemId: this.item.itemId,
        });
      }
    },
    removeListItem() {
      this.$store.dispatch("removeListItem", {
        name: this.name,
        boardId: this.board.id,
        listId: this.list.id,
        itemId: this.item.itemId,
      });
    },
  },
};
</script>

<style></style>
