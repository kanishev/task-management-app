<template>
  <v-card class="mx-0 px-0" flat>
    <form class="pa-2">
      <v-textarea solo name="input-7-4" label="тут текст"></v-textarea>
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
  methods: {
    submit() {
      console.log("1");
    },
  },
};
</script>

<style></style>
