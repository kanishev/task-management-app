<template>
  <v-card style="min-width: 290px; height: max-content" class="mr-4">
    <v-toolbar :color="this.board.image ? '##cbcbcb' : '#5cabf3'" dark>
      <v-toolbar-title>{{ list.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <TaskListActions :list="list" :board="board" />
    </v-toolbar>

    <v-list>
      <draggable v-model="items" v-bind="dragOptions">
        <v-list-group v-for="item in items" :key="item.id">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item class="mx-2 px-2">
            <v-list-item-content>
              <TaskListItem
                :item="item"
                :list="list"
                :board="board"
                type="edit"
              />
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </draggable>

      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="'Add new Task'"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item class="mx-2 px-2">
          <v-list-item-content>
            <TaskListItem :board="board" :list="list" type="create" />
            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import TaskListItem from "./TaskListItem.vue";
import TaskListActions from "./TaskListActions.vue";
import Draggable from "vuedraggable";

export default {
  props: ["list", "board"],
  computed: {
    items: {
      get() {
        return this.list.items;
      },
      set(p) {
        this.$store.dispatch("reorderListItems", {
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
        group: "board-list-items",
      };
    },
  },
  components: { TaskListItem, Draggable, TaskListActions },
};
</script>

<style></style>
