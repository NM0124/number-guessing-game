//step 1: get all instances of all the required elements
const message = document.querySelector(".message");
const number = document.querySelector(".number");
const guessInput = document.querySelector(".guess");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");

const btnCheck = document.querySelector(".check");
const btnAgain = document.querySelector(".again");

//step 2: declare all the required variables
let secretNumber, score, highscore, playing;

//step 3: Again button (New Game) functionality
const init = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  highscore = Number(highscoreEl.textContent); // keep old highscore
  playing = true;

  message.textContent = "Start guessing...";
  number.textContent = "?";
  scoreEl.textContent = score;
  guessInput.value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  number.style.width = "15rem";

  //enable input again
  guessInput.disabled = false;
};
init();

//step 4: Check button functionality
const checkGuess = function () {
  //step 4.1 check if we are playing or not
  if (playing) {
    //step 4.2 take input from the user
    const guess = Number(guessInput.value);

    //step 4.3 if no input
    if (!guess) {
      message.textContent = "No number!";

      //step 4.4 if correct guess
    } else if (guess === secretNumber) {
      message.textContent = "🎉 Correct Number!";
      number.textContent = secretNumber;

      //green background
      document.querySelector("body").style.backgroundColor = "#60b347";
      number.style.width = "30rem";

      //update highscore
      if (score > highscore) {
        highscore = score;
        highscoreEl.textContent = highscore;
      }

      //freeze screen
      playing = false;
      guessInput.disabled = true;

      //step 4.5 if guess is wrong (too high or too low)
    } else {
      if (score > 1) {
        message.textContent = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
        score--;
        scoreEl.textContent = score;
      } else {
        //lost the game
        message.textContent = "You lost the game!";
        scoreEl.textContent = 0;

        // red background on losing
        document.querySelector("body").style.backgroundColor = "#ff0000";

        // optional: show correct number when lost
        number.textContent = secretNumber;

        // freeze screen
        playing = false;
        guessInput.disabled = true;
      }
    }
  }
};

//step 5: add event listeners
btnCheck.addEventListener("click", checkGuess);
btnAgain.addEventListener("click", init);
