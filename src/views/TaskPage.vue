<template>
  <v-container>
    <draggable
      v-model="lists"
      v-bind="dragOptions"
      class="d-flex"
      item-key="itemId"
    >
      <template #item="{element}">
        <TaskList
          :list="element"
          :board="currentBoard"
        />
      </template>
    </draggable>

    <v-card
      v-if="!lists.length && !loading"
      id="preview"
      outlined
      class="mx-auto my-10 d-flex justify-space-between"
      style="border:none"
    >
      <div>
        <v-card-title class="text-h3 mb-5">
          Create your first Task List
        </v-card-title>

        <TasklistEdit
          class="pl-4"
          color="black"
        />
      </div>
      <v-img
        :src="listImage"
        max-width="700px"
        height="auto"
      />
    </v-card>
  </v-container>
</template>

<script>
import TaskList from "../components/Tasks/TaskList.vue";
import TasklistEdit from "../components/Tasks/TaskListEdit.vue";
import ListImage from "../assets/list.svg";
import draggable from "vuedraggable";

import { useBoardsStore } from "../stores/boards";
import { useTasksStore } from "../stores/tasks";
import { mapStores } from "pinia";

export default {
  data() {
    return {
      listImage: ListImage,
      loading: false
    }
  },
  created(){
    this.loading = true;
    this.boardsStore.getBoards().then(() => this.loading = false);
  },
  beforeUnmount() {
    this.boardsStore.setActiveBoard(this.currentBoard)
  },
  computed: {
    ...mapStores(useBoardsStore, useTasksStore),
    activeBoard() {
      return this.boardsStore.activeBoard;
    },
    currentBoard() {
      const boards = this.boardsStore.boards;
      const board = boards.find((b) => b.id == this.$route.params.id);
      if (board) {
        this.boardsStore.setActiveBoard(board)
      }
      return board;
    },
    lists: {
      get() {
        if (!this.currentBoard) {
          return [];
        }
        return this.currentBoard.lists.filter((l) => !l.archived) || [];
      },
      set(payload) {
        this.tasksStore.reorderList({
          boardId: this.$route.params.id,
          payload,
        })
      },
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "board-lists",
      };
    },
  },
  components: { TaskList, TasklistEdit, draggable },
};
</script>

<style></style>
