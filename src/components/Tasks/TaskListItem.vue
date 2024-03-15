<template>
  <v-card class="mx-0 px-0" flat>
    <form class="pa-2">
      <v-textarea
        solo
        name="input-7-4"
        :label="name ? name : 'Task you want add'"
        v-model="name"
      ></v-textarea>
      <v-btn class="mr-4" @click.prevent="addListItem">
        {{ type == "edit" ? "Update" : "Add" }}
      </v-btn>
      <v-btn @click.prevent="removeListItem" v-if="type !== 'create'">
        Удалить
      </v-btn>
    </form>
  </v-card>
</template>

<script>
import { useBoardsStore } from "../../stores/boards";
import { useTasksStore } from "../../stores/tasks";
import { mapStores } from 'pinia';

export default {
  props: ["type", "item", "board", "list"],
  data() {
    return {
      name: this.item ? this.item.name : "",
    };
  },
  computed: {
    ...mapStores(useBoardsStore, useTasksStore)
  },
  methods: {
    addListItem() {
      if (this.type == "create") {
        this.tasksStore.createListItem({
          name: this.name,
          boardId: this.board.id,
          listId: this.list.id,
        })
      } else {
        this.tasksStore.updateListItem({
          name: this.name,
          boardId: this.board.id,
          listId: this.list.id,
          itemId: this.item.itemId
        })
      }
    },
    removeListItem() {
      this.tasksStore.removeListItem({
        name: this.name,
        boardId: this.board.id,
        listId: this.list.id,
        itemId: this.item.itemId,
      })
    },
  },
};
</script>

<style></style>
