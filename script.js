// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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