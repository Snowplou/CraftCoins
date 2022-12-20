// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, child, set, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 2

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
const db = getDatabase()
const dbRef = ref(getDatabase());

let userId = localStorage.getItem("userId")
get(child(dbRef, `ids/` + userId)).then((snapshot) => {
  if(snapshot.val() != null){
    window.location.replace("menu.html")
  }
})

function hash(string) {
  let hash = 0,
    i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function signIn() {
  let username = document.getElementById("nameLogin").value
  let password = document.getElementById("passwordLogin").value

  if(!username || !password){
    return
  }

  get(child(dbRef, `users/` + username + "/password")).then((snapshot) => {
    if(snapshot.val() == null){
      document.getElementById("infoLogin").innerText = "Incorrect Password Or Username"
    }
    else if (hash(password) == snapshot.val()) {
      get(child(dbRef, `users/` + username + "/id")).then((snapshot) => {
      userId = snapshot.val()
      localStorage.setItem("userId", userId)
      window.location.replace("menu.html")
      })
    }
    else {
      document.getElementById("infoLogin").innerText = "Incorrect Password Or Username"
    }
  })
}

function createUser() {
  let username = document.getElementById("nameCreate").value
  let password = document.getElementById("passwordCreate").value

  if(!username || !password){
    return
  }

  get(child(dbRef, `users/` + username + "/exists")).then((snapshot) => {
    if (snapshot.val() == null) {

      let createId = "";
      for (let i = 10; i >= 0; i--) {
        createId += Math.round(Math.random() * 9)
      }
      createId = Number(createId)

      set(ref(db, "users/" + username), {
        exists: true,
        password: hash(password),
        id: createId
      }).then(() => {
        set(ref(db, "ids/" + createId), username)
      }).then(() => {
        localStorage.setItem("userId", createId)
        window.location.replace("menu.html")
      })
    }
    else {
      document.getElementById("infoCreate").innerText = "Username Already Exists"
    }
  })
}

try {
  document.getElementById("login").addEventListener("click", signIn)

}
catch {
  document.getElementById("create").addEventListener("click", createUser)
}