const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");

let score = 0;
let highScore = localStorage.getItem("orbHighScore") || 0;
let timeLeft = 30;
let intervalId;

highScoreDisplay.textContent = highScore;

function spawnOrb() {
const orb = document.createElement("div");
orb.classList.add("orb");

const orbSize = window.innerWidth <= 640 ? 40 : 60;
const areaWidth = window.innerWidth - orbSize;
const areaHeight = window.innerHeight - orbSize;

  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;

orb.style.left = `${x}px`;
orb.style.top = `${y}px`;

orb.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    orb.remove();
});

gameArea.appendChild(orb);

 setTimeout(() => {
    if (gameArea.contains(orb)) orb.remove();
}, 1300);
}

function startGame() {
message.textContent = "";
score = 0;
timeLeft = 30;
scoreDisplay.textContent = 0;
timerDisplay.textContent = 30;

intervalId = setInterval(spawnOrb, 600);

const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
    clearInterval(intervalId);
    clearInterval(timerInterval);
    endGame();
    }
}, 1000);
}

function endGame() {
message.textContent = score >= highScore ? "🎉 ¡Nuevo Récord!" : "⏳ Tiempo agotado!";
if (score > highScore) {
    highScore = score;
    localStorage.setItem("orbHighScore", score);
    highScoreDisplay.textContent = score;
}
removeAllOrbs();

setTimeout(() => {
    document.getElementById("startScreen").style.display = "flex";
}, 3000);
}

function removeAllOrbs() {
document.querySelectorAll(".orb").forEach(o => o.remove());
}

document.addEventListener("DOMContentLoaded", () => {
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    startGame();
});
});
