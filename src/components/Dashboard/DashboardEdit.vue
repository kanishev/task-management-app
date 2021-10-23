<template>
  <details-popup title="New Board" ref="popup">
    <template v-slot:content>
      <form>
        <h4>Form Title</h4>
        <input
          name="boardName"
          type="text"
          class="form-control my-1"
          data-vv-as="Board Name"
          placeholder="Enter your board name"
        />
        <textarea
          name="boardDescription"
          rows="2"
          class="form-control my-1"
          data-vv-as="Board Description"
          placeholder="Enter your board description"
        ></textarea>
        <button class="btn btn-sm btn-app mt-2" @click.prevent="saveBoard">
          Save Board
        </button>
      </form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup.vue";

export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    saveBoard() {
      console.log("save board");
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
