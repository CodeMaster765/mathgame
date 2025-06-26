// script.js

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const problem = document.getElementById("problem");
const optionsContainer = document.getElementById("options");
const resultDisplay = document.getElementById("result");

let time = 20;
let score = 0;
let highScore = 0;
let correctAnswer = 0;
let timer;

function generateProblem() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "x"];
  const op = operators[Math.floor(Math.random() * operators.length)];

  let question = `${a} ${op} ${b}`;
  if (op === "+") correctAnswer = a + b;
  else if (op === "-") correctAnswer = a - b;
  else if (op === "x") correctAnswer = a * b;

  problem.textContent = question;

  const answers = [correctAnswer];
  while (answers.length < 4) {
    const wrong = correctAnswer + Math.floor(Math.random() * 10 - 5);
    if (!answers.includes(wrong) && wrong >= 0) answers.push(wrong);
  }

  answers.sort(() => Math.random() - 0.5);
  optionsContainer.innerHTML = "";

  answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(answer);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === correctAnswer) {
    score++;
    resultDisplay.textContent = "✔️ صحيح!";
  } else {
    resultDisplay.textContent = "❌ خطأ!";
  }
  updateScore();
  generateProblem();
}

function updateScore() {
  scoreDisplay.textContent = score;
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
    localStorage.setItem("mathHighScore", highScore);
  }
}

function startGame() {
  score = 0;
  time = 20;
  resultDisplay.textContent = "";
  startBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  updateScore();
  generateProblem();
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      resultDisplay.textContent = `⏱️ انتهى الوقت! الدرجة: ${score}`;
      optionsContainer.innerHTML = "";
    }
  }, 1000);
}

function resetGame() {
  clearInterval(timer);
  startBtn.classList.remove("hidden");
  resetBtn.classList.add("hidden");
  problem.textContent = "... سؤال ...";
  optionsContainer.innerHTML = "";
  resultDisplay.textContent = "";
  scoreDisplay.textContent = 0;
  timeDisplay.textContent = 20;
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

// تحميل أعلى نتيجة
window.addEventListener("load", () => {
  const savedHigh = localStorage.getItem("mathHighScore");
  if (savedHigh) {
    highScore = parseInt(savedHigh);
    highScoreDisplay.textContent = highScore;
  }
});
