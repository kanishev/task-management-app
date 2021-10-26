<template>
  <v-card max-width="320" height="max-content">
    <v-toolbar color="teal" dark>
      <v-toolbar-title>{{ list.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <draggable v-model="items" v-bind="dragOptions">
        <v-list-group v-for="item in items" :key="item.id">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item class="mx-2 px-2">
            <v-list-item-content>
              <TaskListItem />
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </draggable>
    </v-list>
  </v-card>
</template>

<script>
import TaskListItem from "./TaskListItem.vue";
import Draggable from "vuedraggable";

export default {
  props: ["list", "board"],
  computed: {
    items: {
      get() {
        return this.list.items;
      },
      set(p) {
        this.$store.commit("reorderListItems", {
          boardId: this.board.id,
          listId: this.list.id,
          payload: p,
        });
      },
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "kanban-board-list-items",
        // disabled: this.isEditing || !this.shouldAllowTaskItemsReorder,
      };
    },
  },
  components: { TaskListItem, Draggable },
};
</script>

<style></style>
