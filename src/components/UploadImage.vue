<template>
  <details-popup
    title="Фон страницы"
    page="uploadPage"
    v-show="!this.activeBoard"
    ref="popup"
  >
    <template v-slot>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-file-input
            :rules="rules"
            v-model="image"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
          ></v-file-input>

          <v-btn color="primary darken-1" text @click="saveImage">
            загрузить
          </v-btn>
        </v-container>
      </v-form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../components/Details/DetailsPopup.vue";

export default {
  data() {
    return {
      valid: false,
      image: null,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    };
  },
  computed: {
    activeBoard() {
      const isActive = this.$store.state.activeUpload;
      return isActive;
    },
  },
  methods: {
    saveImage() {
      console.log(this.image);
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
