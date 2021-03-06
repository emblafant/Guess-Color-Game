const colorCodeText = document.querySelector("#colorCode");
const highScoreText = document.querySelector("#highScore");
const currentScoreText = document.querySelector("#currentScore");

const colorBoxesContainer = document.querySelector("#colorBoxesContainer");
const colorBoxCorrect = document.querySelector("#colorBox1");
const colorBox2 = document.querySelector("#colorBox2");
const colorBox3 = document.querySelector("#colorBox3");

const nextBtn = document.querySelector("#nextBtn");

const backgroundOverlay = document.querySelector("#backgroundOverlay");
const resultPopup = document.querySelector("#resultPopup");
const newHighScoreText = document.querySelector("#newHighScore");
const yourScoreText = document.querySelector("#yourScore");
const yourHighScoreText = document.querySelector("#yourHighScore");
const playAgainBtn = document.querySelector("#playAgainBtn");

const randomColorCode = () => {
  const colorCode = "#"+Math.floor(Math.random()*16777215).toString(16);
  return colorCode;
}

const colorCodeCorrect = randomColorCode();
colorCodeText.innerText = colorCodeCorrect;

let colorCode2 = randomColorCode();
let colorCode3 = randomColorCode();

const checkForUniqueColors = () => {
  if (colorCode2 == colorCodeCorrect) {
    colorCode2 = randomColorCode();
    checkForUniqueColors();
  } else if (colorCode3 == colorCodeCorrect || colorCode3 == colorCode2) {
    colorCode3 = randomColorCode();
    checkForUniqueColors();
  }
  return;
};

colorBoxCorrect.style.background = colorCodeCorrect;
colorBox2.style.background = colorCode2;
colorBox3.style.background = colorCode3;

for (let i = colorBoxesContainer.children.length; i >= 0; i--) {
  colorBoxesContainer.appendChild(colorBoxesContainer.children[Math.random() * i | 0]);
};

const makeUnlickable = () => {
  colorBoxCorrect.classList.add("unclickable");
  colorBox2.classList.add("unclickable");
  colorBox3.classList.add("unclickable");
}

let highScore = JSON.parse(localStorage.getItem("highScore"));
highScoreText.innerText = highScore;
let currentScore = JSON.parse(localStorage.getItem("storedCurrentScore"));
if (currentScore) {
  currentScoreText.innerText = currentScore;
} else {
  currentScoreText.innerText = 0;
}
if (highScore) {
  highScoreText.innerText = highScore;
} else {
  highScoreText.innerText = 0;
}

const calculateNewScore = () => {
  currentScore = currentScore + 1;
  localStorage.removeItem("storedCurrentScore");
  localStorage.setItem("storedCurrentScore", currentScore);
}

colorBoxCorrect.addEventListener("click", () => {
  colorBoxCorrect.classList.add("chosen");
  colorBoxCorrect.innerText = "Correct!";
  makeUnlickable();
  nextBtn.classList.remove("unclickable");
  calculateNewScore();
  currentScoreText.innerText = currentScore;
});
colorBox2.addEventListener("click", () => {
  colorBox2.classList.add("chosen");
  colorBox2.innerText = "Incorrect";
  makeUnlickable();
  nextBtn.classList.remove("unclickable");
  nextBtn.innerText = "result";
});
colorBox3.addEventListener("click", () => {
  colorBox3.classList.add("chosen");
  colorBox3.innerText = "Incorrect";
  makeUnlickable();
  nextBtn.classList.remove("unclickable");
  nextBtn.innerText = "result";
});

const showResult = () => {
  resultPopup.classList.remove("hidden");
  if (currentScore > highScore) {
    newHighScoreText.classList.remove("hidden");
  };
  if (!currentScore) {
    currentScore = 0;
  }
  yourScoreText.innerText = currentScore;
  yourHighScoreText.innerText = `HighScore: ${highScore}`;
}

nextBtn.addEventListener("click", () => {
  if (nextBtn.innerText == "result") {
    showResult();
    backgroundOverlay.classList.remove("hidden");
    localStorage.removeItem("storedCurrentScore");
    if (currentScore > highScore) {
      localStorage.removeItem("highScore");
      localStorage.setItem("highScore", currentScore);
    };

  } else {
    document.location.reload();
  }
});

playAgainBtn.addEventListener("click", () => {
  document.location.reload();
})
