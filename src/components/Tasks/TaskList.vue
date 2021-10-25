<template>
  <v-card max-width="320">
    <v-toolbar color="teal" dark>
      <v-toolbar-title>{{ list.title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <draggable v-model="items" v-bind="dragOptions">
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="'заголовок'"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.item"
            :key="child.id"
            class="mx-2 px-2"
          >
            <v-list-item-content>
              <TaskListItem :child="item" />
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
  props: ["list"],
  computed: {
    items: {
      get() {
        return this.list.items;
      },
      set(p) {
        this.$store.commit("reorderList", p);
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
