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

document.getElementById("signOut").addEventListener("click", () => {
  localStorage.setItem("userId", null)
  localStorage.setItem("username", null)
  window.location.replace("../../login.html")
})

document.getElementById("menu").addEventListener("click", () => {
  window.location.replace("../../menu.html")
})

let totalCoins = 0
get(child(dbRef, `users/` + localStorage.getItem("username") + "/coins")).then((snapshot) => {
  totalCoins = snapshot.val()
})


// Create game variables
let board = []
let boardSize = 20
let snakeStartingSize = 6 /* Must be even number */
let score = 0
let grow = 0;
let directionChanged = false

for (let i = 0; i < boardSize; i++) {
  let row = document.createElement("div")
  row.id = "row" + i
  document.getElementById("board").appendChild(row)
  row = document.getElementById("row" + i)
  row.className = "row"
  board.push([])
  for (let j = 0; j < boardSize; j++) {
    let square = document.createElement("div")
    square.id = "square " + j + " " + (boardSize - 1 - i)
    square.className = "square"
    row.appendChild(square)
    board[i].push("empty")
  }
  row.appendChild(document.createElement("br"))
}

// Control snake
let direction = "none"

addEventListener("keydown", function (event) {
  if ((event.key == "ArrowUp" || event.key == "w") && direction != "down" && !directionChanged) {
    direction = "up"
    directionChanged = true
  }
  else if ((event.key == "ArrowLeft" || event.key == "a") && direction != "right" && direction != "none" && !directionChanged) {
    direction = "left"
    directionChanged = true
  }
  else if ((event.key == "ArrowDown" || event.key == "s") && direction != "up" && !directionChanged) {
    direction = "down"
    directionChanged = true
  }
  else if ((event.key == "ArrowRight" || event.key == "d") && direction != "left" && !directionChanged) {
    direction = "right"
    directionChanged = true
  }
})

// Intitalize snake and food
let snake = []
for (let i = 0; i < snakeStartingSize; i++) {
  snake.push([boardSize / 2 + (i - (snakeStartingSize / 2)), boardSize / 2])
}
let food = []
displaySnake()
placeFood()

let runningGame = setInterval(function () {

  directionChanged = false;

  if (direction == "up") {
    snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1])
  }
  else if (direction == "left") {
    snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]])
  }
  else if (direction == "down") {
    snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1])
  }
  else if (direction == "right") {
    snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]])
  }

  if (snake[snake.length - 1][0] >= boardSize || snake[snake.length - 1][1] >= boardSize || snake[snake.length - 1][0] < 0 || snake[snake.length - 1][1] < 0) {
    gameOver(2)
  }
  else {
    document.getElementById("square " + snake[0][0] + " " + snake[0][1]).style.backgroundColor = "black"
  }

  if (direction != "none" && grow == 0) {
    snake.shift()
  }

  if (grow > 0) {
    grow--
  }

  displaySnake()

  for (let i = 0; i < snake.length - 1; i++) {
    if (snake[i][0] == snake[snake.length - 1][0] && snake[i][1] == snake[snake.length - 1][1]) {
      gameOver(1)
      return
    }
  }

  if (snake[snake.length - 1][0] == food[0] && snake[snake.length - 1][1] == food[1]) {
    score++
    document.getElementById("scoreDisplay").innerText = "Score: " + score
    placeFood()
    grow += 3
  }

}, 150)

function displaySnake() {
  for (let coord in snake) {

    // let red = coord / (snake.length - 1) * 255
    // let blue = 255 - red
    let red = 255
    let blue = 0

    document.getElementById("square " + snake[coord][0] + " " + snake[coord][1]).style.backgroundColor = "rgb(" + red + ",0," + blue + ")"
  }
}

function placeFood() {
  let x = Math.round(Math.random() * (boardSize - 1))
  let y = Math.round(Math.random() * (boardSize - 1))
  for (let i = 0; i < snake.length - 1; i++) {
    if (snake[i][0] == x && snake[i][1] == y) {
      placeFood()
      return
    }
    else {
      food[0] = x
      food[1] = y
      document.getElementById("square " + x + " " + y).style.backgroundColor = "rgb(0, 155, 0)"
    }
  }
}

function gameOver(square) {

  let cycleTime = 750
  let cycles = 3

  document.getElementById("scoreOver").innerText = "Score: " + score

  clearInterval(runningGame)

  get(child(dbRef, `users/` + localStorage.getItem("username") + "/coins")).then((snapshot) => {
    set(ref(db, "users/" + localStorage.getItem("username") + "/coins"), snapshot.val() + score)
  })

  for (let i = 1; i <= 2 * cycles; i++) {
    setTimeout(() => {
      if (i % 2) {
        document.getElementById("square " + snake[snake.length - square][0] + " " + snake[snake.length - square][1]).style.backgroundColor = "white"
      }
      else {
        document.getElementById("square " + snake[snake.length - square][0] + " " + snake[snake.length - square][1]).style.backgroundColor = "red"
      }
    }, i * cycleTime)
  }
  setTimeout(() => {
    document.getElementById("gameOver").style.display = "block"
    document.getElementById("board").style.display = "none"
    totalCoins += score
    document.getElementById("coinText").innerHTML = "Total Coins: " + totalCoins
  }, (((cycles + 1) * 2) - 1) * cycleTime)
}

document.getElementById("playAgain").addEventListener("click", () => {
  location.reload()
})