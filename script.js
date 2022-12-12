var username;
var password;

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, child, set, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiLPDnT2SVW4KP-dSqMBa1nE60R7W3gJ0",
  authDomain: "craftcoins-62c53.firebaseapp.com",
  projectId: "craftcoins-62c53",
  storageBucket: "craftcoins-62c53.appspot.com",
  messagingSenderId: "646247723233",
  appId: "1:646247723233:web:65bce628e8b21817c3c7a0",
  measurementId: "G-2FRE7NY4PV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const db = getDatabase();
//   set(ref(db, "test"), {
//     a: 3,
//     b: 4,
//   })


// const dbRef = ref(getDatabase());
// get(child(dbRef, `test`)).then((snapshot) => {
//     console.log(snapshot.val());
//   })