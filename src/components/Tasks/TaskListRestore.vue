<template>
  <details-popup
    ref="popup"
    v-show="this.isBoardActive"
    page="restorePage"
    title="Lists in archive"
    @createBoard="saveBoard"
    @cancleBoard="cancleBoard"
  >
    <template v-slot>
      <v-list dense>
        <v-list-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in archivedLists" :key="i">
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-action>
              <v-btn x-small @click="rearchiveList(item)">
                Return to active list
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>

        <v-divider></v-divider>
        <v-list-item v-if="archivedLists.length == 0">
          <v-list-item-title> No lists in archive</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-btn x-small class="ma-3">
        Ок
      </v-btn>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";
import { useBoardsStore } from "../../stores/boards";
import { useTasksStore } from "../../stores/tasks";
import { mapStores } from 'pinia';

export default {
  data() {
    return {
      selectedItem: "",
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      board: {
        id: "",
        title: "",
      },
    };
  },
  computed: {
    ...mapStores(useBoardsStore, useTasksStore),
    isBoardActive() {
      return this.boardsStore.activeBoard;
    },
    archivedLists() {
      return this.tasksStore.archivedLists;
    },
  },
  methods: {
    saveBoard() {
      this.$refs.form.validate();
    },
    cancleBoard() {
      this.valid = true;
      this.board.id = "";
      this.board.title = "";
      this.board.description = "";
    },
    rearchiveList(item) {
      this.tasksStore.archiveTaskList({
        boardId: this.isBoardActive.id,
        listId: item.id,
      })
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
