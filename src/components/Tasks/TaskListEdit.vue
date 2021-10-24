<template>
  <details-popup
    v-show="this.isBoardActive"
    title="Новый список"
    ref="popup"
    @createBoard="saveBoard"
    @cancleBoard="cancleBoard"
  >
    <template v-slot:content>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-text-field
            class="px-3"
            v-model="board.title"
            label="Введите название списка"
            :rules="emptyRules"
            required
          ></v-text-field>
        </v-container>
      </v-form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";

export default {
  data() {
    return {
      valid: false,
      emptyRules: [(v) => !!v || "Поле не может быть пустым"],
      board: {
        id: "",
        title: "",
      },
    };
  },
  computed: {
    isBoardActive() {
      return this.$store.state.activeBoard;
    },
  },
  methods: {
    saveBoard() {
      this.$refs.form.validate();
      console.log(this.board);
    },
    cancleBoard() {
      this.valid = true;
      this.board.id = "";
      this.board.title = "";
      this.board.description = "";
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
