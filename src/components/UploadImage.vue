<template>
  <details-popup
    ref="popup"
    title="Set image"
    type="image"
    page="uploadPage"
    color="dark"
    :loading="loading"
  >
    <template v-slot>
      <v-form ref="form" v-model="valid">
        <v-container>
          <div v-if="!imageSize" class="pa-2">
            Image size can't be less than 1600x800px
          </div>

          <v-file-input
            :rules="rules"
            type="file"
            v-model="file"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            @change="selectedFile"
          ></v-file-input>

          <v-btn color="primary darken-1" text @click.stop="saveImage">
            Set image
          </v-btn>
        </v-container>
      </v-form>
    </template>
  </details-popup>
</template>

<script>
import DetailsPopup from "../components/Details/DetailsPopup.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import db from "../firebase/firebaseInit";

import { useBoardsStore } from "../stores/boards";
import { mapStores } from 'pinia';

export default {
  data() {
    return {
      valid: false,
      file: null,
      image: {
        size: "",
        height: "",
        width: "",
      },
      imageLoaded: false,
      rules: [
        (value) =>
          !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      loading: true
    };
  },
  computed: {
    ...mapStores(useBoardsStore),
    activeBoard() {
      const isActive = this.boardsStore.activeBoard;
      return isActive;
    },
    imageSize() {
      return (
        this.image.width >= 1600 && this.image.height >= 800 && this.imageLoaded
      );
    },
  },
  methods: {
    selectedFile() {
      this.imageLoaded = false;

      let file = this.file[0];
      if (!file || file.type.indexOf("image/") !== 0) return;

      this.image.size = file.size;

      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        let img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          this.imageLoaded = true;
        };
        img.src = evt.target.result;
      };

      reader.onerror = (evt) => {
        console.error(evt);
      };
    },

    saveImage() {
      if (this.imageSize) {
        try {
          this.loading = true;

          const file = this.file[0];
          const dataBase = db.collection("boards").doc(this.$route.params.id);
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/bardImages/${file.name}`);

          docRef.put(file).on("state_changed",
            (snapShot) => {
              console.warn(snapShot);
            },
            (err) => {
              console.warn(err);
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              await dataBase.update({
                boardImage: downloadURL,
              });

              this.boardsStore.updateBoardImage({
                id: this.$route.params.id,
                image: downloadURL,
              })

              this.loading = false;
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
  components: {
    DetailsPopup,
  },
};
</script>

<style></style>
