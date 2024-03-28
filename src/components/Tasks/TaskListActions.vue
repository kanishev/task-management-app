<template>
  <details-dropdown ref="dropdown">
    <template #handle>
      ...
    </template>
    <template #content>
      <label
        class="content-item"
        @click.prevent="showListEditPopup"
      >Edit</label>
      <label
        class="content-item"
        @click.prevent="archiveList"
      >Archive</label>
    </template>
  </details-dropdown>
</template>

<script>
import DetailsDropdown from "../Details/DetailsDropdown.vue";
import { useBoardsStore } from "../../stores/boards";
import { useTasksStore } from "../../stores/tasks";
import { mapStores } from 'pinia';

export default {
  components: { DetailsDropdown },
  props: ["list", "board"],
  computed: {
    ...mapStores(useBoardsStore, useTasksStore)
  },
  methods: {
    showListEditPopup() {
      this.$refs.dropdown.close();
    },
    archiveList() {
      this.tasksStore.archiveTaskList({
        boardId: this.board.id,
        listId: this.list.id,
      })
      this.$refs.dropdown.close();
    },
  },
};
</script>

<style></style>
