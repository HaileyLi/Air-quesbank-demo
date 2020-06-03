import firebase from "firebase";
import uuid from 'uuid/v4';

const config = {
    authDomain: "quesbank-f37e7.firebaseapp.com",
    databaseURL: "https://quesbank-f37e7.firebaseio.com",
    projectId: "quesbank-f37e7",
    storageBucket: "",
    messagingSenderId: "796804009906"
}

firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
const dataRef = databaseRef.child("textbook");

export default dataRef;