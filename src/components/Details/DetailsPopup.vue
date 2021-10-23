<template>
  <div>
    <v-btn color="primary" dark @click.stop="dialog = true">
      {{ title }}
    </v-btn>

    <v-dialog v-model="dialog" max-width="590">
      <v-card>
        <slot name="content"></slot>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    open() {
      this.$refs.details.setAttribute("open", "");
    },
    close() {
      this.$refs.details.removeAttribute("open");
    },
  },
};
</script>

<style></style>
