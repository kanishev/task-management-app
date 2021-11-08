<template>
  <details-dropdown ref="dropdown">
    <template v-slot:handle>...</template>
    <template v-slot:content>
      <label class="content-item" @click.prevent="showListEditPopup"
        >Изменить</label
      >
      <label class="content-item" @click.prevent="archiveList">В архив</label>
    </template>
  </details-dropdown>
</template>

<script>
import DetailsDropdown from "../Details/DetailsDropdown.vue";

export default {
  props: ["list", "board"],
  components: { DetailsDropdown },
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
      this.$store.dispatch("archiveTaskList", {
        boardId: this.board.id,
        listId: this.list.id,
      });
      this.$refs.dropdown.close();
    },
  },
};
</script>

<style></style>
