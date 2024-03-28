<template>
  <details-popup
    ref="popup"
    v-show="!activeBoard"
    page="dashboard"
    :title="title"
    :loading="loading"
    :color="color"
    @create-board="saveBoard"
    @cancle-board="cancleBoard"
    @update-modal-data="updateBoard"
  >
    <template #default>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-container>
          <v-text-field
            v-model="board.name"
            class="px-3"
            label="Board name"
            :rules="emptyRules"
            required
            @keyup.enter="saveBoard"
          />

          <v-text-field
            v-model="board.description"
            class="px-3"
            :rules="emptyRules"
            label="Board description"
            required
            @keyup.enter="saveBoard"
          />

          <v-btn
            color="primary darken-1"
            text
            @click="saveBoard"
          >
            {{ type == "create" ? "Create" : "Update" }}
          </v-btn>
        </v-container>
      </v-form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";
import { useUserStore } from "../../stores/user";
import { useBoardsStore } from "../../stores/boards";
import { mapStores } from 'pinia';

export default {
  props: ["color", "type"],
  data() {
    return {
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      board: {
        id: "",
        name: "",
        description: "",
        image: null,
      },
      loading: false
    };
  },
  computed: {
    ...mapStores(useUserStore, useBoardsStore),
    activeBoard() {
      return this.boardsStore.activeBoard;
    },
    profileId() {
      return this.userStore.profileId;
    },
    title() {
      return this.type == 'create' ? 'Create Board' : 'Update Board'
    }
  },
  methods: {
    async saveBoard() {
      let isValid = this.$refs.form.validate();
      if (isValid) {
        if (this.type == "create") {
          this.loading = true;
          await this.boardsStore.saveBoard({
            id: this.board.id,
            name: this.board.name,
            description: this.board.description,
            image: this.board.image,
            profileId: this.profileId,
          })
          this.loading = false;
        } else if (this.type == "update") {
          this.loading = true;
          await this.boardsStore.updateBoard({
            id: this.board.id,
            name: this.board.name,
            description: this.board.description,
            image: this.board.image,
            profileId: this.profileId,
          })
          this.loading = false;
        }
      }
    },
    updateBoard(updated) {
      this.$emit('update:type', updated.type);

      if (updated.type == "create") {
        this.cancleBoard();
      } else if (updated.board) {
        this.board.id = updated.board.id;
        this.board.name = updated.board.name;
        this.board.description = updated.board.description;
      }
    },
    cancleBoard() {
      this.valid = true;
      this.board.id = "";
      this.board.name = "";
      this.board.description = "";
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
