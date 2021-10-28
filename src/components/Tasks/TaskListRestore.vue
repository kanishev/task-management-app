<template>
  <details-popup
    v-show="this.isBoardActive"
    page="restorePage"
    title="Списки в архиве"
    ref="popup"
    @createBoard="saveBoard"
    @cancleBoard="cancleBoard"
  >
    <template v-slot>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.text">HELLO</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-divider></v-divider>

        <v-list-item v-if="items.length > 0">
          <v-list-item-content>
            <v-list-item-title> Nothing to restore</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";

export default {
  created() {
    this.$store.commit("setActivePage", "taskPage");
  },
  data() {
    return {
      selectedItem: "",
      items: [
        { text: "Hello" },
        { text: "Hello" },
        { text: "Hello" },
        { text: "Hello" },
      ],
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
