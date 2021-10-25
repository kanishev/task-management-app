<template>
  <v-card class="mx-0 px-0" flat>
    <form class="pa-2">
      <v-textarea solo name="input-7-4" :label="child.text"></v-textarea>
      <v-btn class="mr-4" @click="submit">
        submit
      </v-btn>
      <v-btn>
        clear
      </v-btn>
    </form>
  </v-card>
</template>

<script>
export default {
  props: ["child"],
  mounted() {
    console.log(this.child);
  },
  methods: {
    submit() {
      console.log("1");
    },
  },
};
</script>

<style></style>
