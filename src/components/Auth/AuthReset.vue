<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="resetForm" v-model="valid" lazy-validation>
        <v-row>
          <h2 class="pa-3">Введите email для восстановления пароля</h2>
          <v-col cols="12">
            <v-text-field
              v-model="resetEmail"
              :rules="resetEmailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
            <v-btn
              x-large
              block
              :disabled="!valid"
              color="success"
              @click="validate"
            >
              Сбросить
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      show1: false,
      resetEmail: "",
      resetEmailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    validate() {
      const isValid = this.$refs.resetForm.validate();

      if (isValid) {
        return;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
