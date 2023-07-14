const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

/////////////////////////////////////////
// Helper functions
const renderWords = function (word) {
	return (word.innerHTML = `
    ${selectedWord
			.split("")
			.map(
				letter => `
      <span class="letter"> 
        ${correctLetters.includes(letter) ? letter : ""}
      </span>
    `
			)
			.join("")}
  `);
};

/////////////////////////////////////////
// Show hidden word
const displayWord = function () {
	renderWords(wordEl);

	const innerWord = wordEl.innerText.replace(/\n/g, "");

	if (innerWord === selectedWord) {
		finalMessage.innerText = "Congratulations! You won!";
		popup.style.display = "flex";
	}
};

// Update the wrong letters
const updateWrongLettersEl = function () {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
		${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
		${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) part.style.display = "block";
		else part.style.display = "none";
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = "Unfortunately you lost!";
		popup.style.display = "flex";
	}
};

// Show notification
const showNotification = function () {
	notification.classList.add("show");
	setTimeout(() => {
		notification.classList.remove("show");
	}, 2000);
};

/////////////////////////////////////////
// Keydown letter press
window.addEventListener("keydown", function (e) {
	// console.log(e.keyCode);

	// Gaurd Clause
	if (e.keyCode < 65 || e.keyCode > 90) return;

	const letter = e.key;

	if (!selectedWord.includes(letter)) {
		if (wrongLetters.includes(letter)) {
			showNotification();
			return;
		}
		wrongLetters.push(letter);
		updateWrongLettersEl();
		return;
	}

	if (correctLetters.includes(letter)) {
		showNotification();
		console.log("letter added");
		return;
	}

	correctLetters.push(letter);
	console.log("right");
	displayWord();
});

// Restart game and play again

displayWord();

playAgainBtn.addEventListener("click", function (e) {
	// Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();
	updateWrongLettersEl();

	popup.style.display = "none";
});
