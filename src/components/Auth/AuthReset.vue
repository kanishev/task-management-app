<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="resetForm" v-model="valid" lazy-validation>
        <v-row>
          <h2 class="pa-3 title">
            Please, type your email to reset your password
          </h2>

          <h3 class="pa-3 ">{{ message }}</h3>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              autocomplete="email"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
            <v-btn
              block
              text
              outlined
              :disabled="!valid"
              color="#4682b4"
              @click="resetPassword"
            >
              Reset
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  props: ['loading', 'message'],
  data() {
    return {
      valid: false,
      show1: false,
      email: "",
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    resetPassword() {
      const isValid = this.$refs.resetForm.validate();

      if (isValid) {
        this.$emit('update:loading', true);
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.message = "Проверьте почту";
          })
          .catch((e) => {
            console.log(e);
            this.$emit('update:message', e.code);
          })
          .finally(() => {
            this.$emit('update:loading', false);
          });
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
