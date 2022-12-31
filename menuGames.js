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

const games = {
  Snake: {
    picture: "snake.png",
    description: "Collect apples to gain points, but make sure you don't hit yourself or a wall.\n\nCompatibility: Computers Only",
    file: "snake"
  },
  "Flappy Bird": {
    picture: "https://images.squarespace-cdn.com/content/v1/5b7ae719620b85e8c55a4821/1564073982545-R00MB5WN7F82OT42JWQV/Coming+Soon+Disclosures.io?format=1000w",
    description: "Coming Soon!\n\nCompatibility: All Devices",
    file: "bird"
  }
}

for (let game in games) {
  let gameDiv = document.createElement("div")
  gameDiv.className = "game"

  let title = document.createElement("p")
  title.innerText = game
  title.className = "title"
  gameDiv.appendChild(title)

  let picture = document.createElement("img")
  picture.src = games[game].picture
  picture.className = "picture"
  gameDiv.appendChild(picture)

  let description = document.createElement("p")
  description.innerText = games[game].description
  description.className = "description"
  gameDiv.appendChild(description)

  gameDiv.addEventListener("click", () => {
    window.location.replace("games/" + games[game].file + "/" + games[game].file + ".html")
  })

  document.getElementById("games").appendChild(gameDiv)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase()
const dbRef = ref(getDatabase());

let userId = localStorage.getItem("userId")
get(child(dbRef, `ids/` + userId)).then((snapshot) => {
  if (snapshot.val() == null) {
    window.location.replace("login.html")
  }
  else{
    get(child(dbRef, `users/` + snapshot.val() + "/coins")).then((snapshot) => {
      document.getElementById("coinDisplay").innerHTML = "Coins: " + snapshot.val()
    })
  }
})

document.getElementById("signOut").addEventListener("click", () => {
  localStorage.setItem("userId", null)
  localStorage.setItem("username", null)
  window.location.replace("login.html")
})