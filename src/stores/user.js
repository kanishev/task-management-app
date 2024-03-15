import { defineStore } from "pinia";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileId: null,
    profileInitials: null,
  }),
  actions: {
    async getUser() {
      try {
        const dataBase = await db
          .collection("users")
          .doc(firebase.auth().currentUser.uid);

        const dbResults = await dataBase.get();
        this.setProfile(dbResults);
        this.setProfileInitials();
      } catch (e) {
        console.log(e);
      }
    },
    async updateUserProfile() {
      try {
        this.state.isLoading = true;
        const dataBase = await db.collection("users").doc(this.profileId);
        await dataBase.update({
          firstName: this.profileFirstName,
          lastName: this.profileLastName,
        });
        this.setProfileInitials();
      } catch (e) {
        console.log(e);
      } finally {
        this.state.isLoading = false;
      }
    },
    updateUser(user) {
      this.user = user;
    },
    setProfile(payload) {
      this.profileId = payload.id;
      this.profileEmail = payload.data().email;
      this.profileFirstName = payload.data().firstName;
      this.profileLastName = payload.data().lastName;
    },
    changeProfileInfo(key, value) {
      this.state[key] = value;
    },
    setProfileInitials() {
      this.profileInitials = this.profileFirstName.charAt(0).toUpperCase() + this.profileLastName.charAt(0).toUpperCase();
    },
  }
})