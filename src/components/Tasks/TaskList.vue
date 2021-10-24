<template>
  <v-card max-width="320">
    <v-toolbar color="teal" dark>
      <v-toolbar-title>Topics</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
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
          v-for="child in item.items"
          :key="child.id"
          class="mx-2 px-2"
        >
          <v-list-item-content>
            <TaskListItem />
            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import TaskListItem from "./TaskListItem.vue";

export default {
  data() {
    return {
      items: [
        {
          items: [123],
        },
        {
          items: [123],
        },
        {
          items: [123],
        },
      ],
    };
  },
  components: { TaskListItem },
};
</script>

<style></style>
