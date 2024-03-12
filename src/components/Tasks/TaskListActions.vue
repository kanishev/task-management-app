<template>
  <details-dropdown ref="dropdown">
    <template v-slot:handle>...</template>
    <template v-slot:content>
      <label class="content-item" @click.prevent="showListEditPopup">Edit</label>
      <label class="content-item" @click.prevent="archiveList">Archive</label>
    </template>
  </details-dropdown>
</template>

<script>
import DetailsDropdown from "../Details/DetailsDropdown.vue";
import { useBoardsStore } from "../../stores/boards";
import { useTasksStore } from "../../stores/tasks";
import { mapStores } from 'pinia';

export default {
  props: ["list", "board"],
  components: { DetailsDropdown },
  computed: {
    ...mapStores(useBoardsStore, useTasksStore)
  },
  methods: {
    showListEditPopup() {
      this.$store.commit("openModal", {
        list: this.list,
        board: this.board,
        page: "taskPage",
        type: "update",
      });
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
