<template>
  <v-card
    style="min-width: 290px; height: max-content"
    class="mr-4"
  >
    <v-toolbar
      :color="board.image ? '#cbcbcb' : '#5cabf3'"
      dark
    >
      <v-toolbar-title>{{ list.name }}</v-toolbar-title>
      <v-spacer />
      <TaskListActions
        :list="list"
        :board="board"
      />
    </v-toolbar>

    <v-list>
      <draggable
        v-model="items"
        v-bind="dragOptions"
        item-key="item"
      >
        <template #item="{element}">
          <v-list-group>
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="element.name"
              />
            </template>

            <v-list-item class="mx-2 px-2">
              <TaskListItem
                :item="element"
                :list="list"
                :board="board"
                type="edit"
              />
              <v-divider />
            </v-list-item>
          </v-list-group>
        </template>
      </draggable>

      <v-list-group value="Task">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Add new Task"
          />
        </template>

        <v-list-item class="mx-2 px-2">
          <TaskListItem
            :board="board"
            :list="list"
            type="create"
          />
          <v-divider />
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import TaskListItem from "./TaskListItem.vue";
import TaskListActions from "./TaskListActions.vue";
import Draggable from "vuedraggable";

import { useBoardsStore } from "../../stores/boards";
import { useTasksStore } from "../../stores/tasks";
import { mapStores } from 'pinia';

export default {
  props: ["list", "board"],
  computed: {
    ...mapStores(useBoardsStore, useTasksStore),
    items: {
      get() {
        return this.list.items;
      },
      set(p) {
        this.tasksStore.reorderListItems({
          boardId: this.board.id,
          listId: this.list.id,
          payload: p,
        })
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
