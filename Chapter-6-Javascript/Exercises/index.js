const rgbDisplay = document.getElementById("rgb-display");
const optionsContainer = document.querySelector(".options");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");

// Game state
let correctColor = "";
let lives = 3;
let score = 0;

// Generate a random RGB color
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start or reset the game
function startGame() {
  optionsContainer.innerHTML = "";
  message.textContent = "";
  restartBtn.style.display = "none";
  lives = 3;
  score = 0;
  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
  generateRound();
}

// Generate a round of choices
function generateRound() {
  optionsContainer.innerHTML = "";
  const correct = randomColor();
  correctColor = correct;
  rgbDisplay.textContent = correct;

  const options = [correct];
  while (options.length < 3) {
    const newColor = randomColor();
    if (!options.includes(newColor)) options.push(newColor);
  }

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Display option buttons
  options.forEach(color => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color;
    btn.addEventListener("click", () => checkAnswer(color));
    optionsContainer.appendChild(btn);
  });
}

// Check user guess
function checkAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    message.textContent = "Correct!";
    message.style.color = "lightgreen";
    score++;
    scoreDisplay.textContent = score;
    setTimeout(generateRound, 1000);
  } else {
    lives--;
    livesDisplay.textContent = lives;
    message.textContent = "Incorrect!";
    message.style.color = "red";
    if (lives === 0) {
      endGame();
    }
  }
}

// End the game
function endGame() {
  message.textContent = `Game Over! Final Score: ${score}`;
  message.style.color = "white";
  restartBtn.style.display = "inline-block";
}

// Restart button
restartBtn.addEventListener("click", startGame);

// Start on load
startGame();
