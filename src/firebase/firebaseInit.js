import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYwEB7GS0SgxiQhF014i6VAloPSt5HoFw",
  authDomain: "vue-trello-9bb5d.firebaseapp.com",
  projectId: "vue-trello-9bb5d",
  storageBucket: "vue-trello-9bb5d.appspot.com",
  messagingSenderId: "952527215876",
  appId: "1:952527215876:web:01825497b5b20908814451",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
