<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="registerForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              label="Имя"
              maxlength="20"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="lastName"
              :rules="[rules.required]"
              label="Фамилия"
              maxlength="20"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Пароль"
              hint="At least 6 characters"
              counter
              @click:append="show = !show"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              block
              v-model="verify"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, passwordMatch]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Пароль еще раз"
              counter
              @click:append="show = !show"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn
              block
              text
              outlined
              :disabled="!valid"
              color="#4682b4"
              @click.prevent="register"
              >Register</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../../firebase/firebaseInit";

export default {
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verify: "",
      show: false,
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 6) || "Min 6 characters",
      },
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    async register() {
      const isValid = this.$refs.registerForm.validate();

      if (isValid) {
        try {
          this.$store.commit("setLoading", true);
          const firebaseAuth = await firebase.auth();
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
          const result = await createUser;
          const dataBase = db.collection("users").doc(result.user.uid);
          await dataBase.set({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
          });
          this.$router.push("/");
          return;
        } catch (e) {
          console.log(e);
          this.$store.commit("setMessage", e.code);
        } finally {
          this.$store.commit("setLoading", false);
        }
      }
    },
  },
};
</script>

<style></style>
