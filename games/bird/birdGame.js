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
  if (snapshot.val() == null) {
    window.location.replace("login.html")
  }
})

// document.getElementById("signOut").addEventListener("click", () => {
//   localStorage.setItem("userId", null)
//   localStorage.setItem("username", null)
//   window.location.replace("../../login.html")
// })

// document.getElementById("menu").addEventListener("click", () => {
//   window.location.replace("../../menu.html")
// })




// main.js
const gameContainer = document.getElementById("game-container");
const bird = document.getElementById("bird");
const pipeContainer = document.getElementById("pipe-container");

let isJumping = false;
let gravity = 0.25;
let upwardForce = -4;
let birdY = 250;
let pipeInterval = 2000;
let lastPipeTime = 0;

function update() {
  // Update bird position
  birdY += gravity;
  bird.style.bottom = birdY + "px";

  // Check if bird is touching a pipe
  const pipes = document.querySelectorAll(".pipe");
  pipes.forEach((pipe) => {
    if (
      (bird.offsetLeft + bird.offsetWidth > pipe.offsetLeft &&
        bird.offsetLeft < pipe.offsetLeft + pipe.offsetWidth &&
        bird.offsetTop < pipe.offsetTop + pipe.offsetHeight) ||
      bird.offsetTop + bird.offsetHeight > gameContainer.offsetHeight
    ) {
      gameOver();
    }
  });

  // Generate new pipes
  if (Date.now() - lastPipeTime > pipeInterval) {
    lastPipeTime = Date.now();
    generatePipe();
  }

  // Loop the update function
  requestAnimationFrame(update);
}

function gameOver() {
  // Stop the game loop and show a game over message
  cancelAnimationFrame(update);
  alert("Game over!");
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    birdY += upwardForce;
    bird.style.bottom = birdY + "px";
    setTimeout(() => (isJumping = false), 500);
  }
}

function generatePipe() {
  // Create a new pipe element and add it to the pipe container
  const pipe = document.createElement("div");
  pipe.classList.add("pipe");
  pipeContainer.appendChild(pipe);

  // Calculate a random height for the pipe
  const pipeHeight = Math.floor(Math.random() * 200) + 50;
  pipe.style.height = pipeHeight + "px";

  // Position the top pipe
  const topPipe = pipe.cloneNode();
  topPipe.style.bottom = "";
  topPipe.style.height = gameContainer.offsetHeight - pipeHeight - 150 + "px";
  topPipe.style.top = "0";
  pipeContainer.appendChild(topPipe);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

update();