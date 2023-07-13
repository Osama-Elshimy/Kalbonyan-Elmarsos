"use strict";

// Selecting the elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting conditions

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Setting the total scores and the current scores back to zero

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Resetting the dice
  diceEl.classList.add("hidden");

  // Removing any winner-styles

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  // Setting active player

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

// Switch player function
function swithPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  // Checking if the game is running
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `imgs/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; // Change later
    } else {
      // Swith to next player
      swithPlayer();

      // Test
      /*     if (activePlayer === 0) {
      player0El.classList.add('player--active');
      player1El.classList.remove('player--active');
    } else {
      player1El.classList.add('player--active');
      player0El.classList.remove('player--active');
    } */

      // current0El.textContent = currentScore;
    }
  }
});

btnHold.addEventListener("click", function () {
  // Checking if the game is running
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next player
      swithPlayer();
    }
  }
});

// New Game Button
btnNew.addEventListener("click", init);
