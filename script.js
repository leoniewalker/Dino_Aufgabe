const eagle = document.getElementById("eagle");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const startButton = document.getElementById("startButton");
const explosion = document.getElementById("explosion");

let isGameOver = false;
let isGameStarted = false;
let gameLoop = null;

// Sprungfunktion
function jump() {
  if (isGameOver || !isGameStarted) return;

  if (!eagle.classList.contains("jump-animation")) {
    eagle.classList.add("jump-animation");

    setTimeout(() => {
      eagle.classList.remove("jump-animation");
    }, 1000);
  }
}

// Spiel starten
function startGame() {
  if (isGameStarted) return;

  console.log("Start Button wurde geklickt");

  isGameStarted = true;
  isGameOver = false;

  score.innerText = "0";

  explosion.classList.remove("explosion-show");
  explosion.style.display = "none";

  rock.style.left = "550px";
  rock.style.display = "block";
  rock.style.animation = "rock-move 1.33s infinite linear";

  gameLoop = setInterval(() => {
    if (isGameOver || !isGameStarted) return;

    const eagleTop = parseInt(window.getComputedStyle(eagle).getPropertyValue("top"));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));

    let currentScore = parseInt(score.innerText);
    score.innerText = currentScore + 2;

    // Kollision
    if (rockLeft < 50 && rockLeft > 0 && eagleTop > 150) {
      isGameOver = true;
      isGameStarted = false;

      clearInterval(gameLoop);

      // Hindernis stoppen und verstecken
      rock.style.animation = "none";
      rock.style.left = rockLeft + "px";
      rock.style.display = "none";

      // Explosion genau am Hindernis anzeigen
      explosion.style.left = (rockLeft - 20) + "px";
      explosion.style.top = "210px";
      explosion.style.display = "block";
      explosion.classList.add("explosion-show");

      const finalScore = score.innerText;
      score.innerText = "GAME OVER! Score: " + finalScore;
    }
  }, 50);
}

// Springen mit Tastatur
document.addEventListener("keydown", () => {
  jump();
});

// Start Button
startButton.addEventListener("click", startGame);
