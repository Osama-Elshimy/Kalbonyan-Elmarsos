const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

/////////////////////////////////////////////

// List of words for game
const words = [
	"sigh",
	"tense",
	"airplane",
	"ball",
	"pies",
	"juice",
	"warlike",
	"bad",
	"north",
	"dependent",
	"steer",
	"silver",
	"highfalutin",
	"superficial",
	"quince",
	"eight",
	"feeble",
	"admit",
	"drag",
	"loving",
];

// Init word & score & time
let randomWord;
let score = 0;
let time = 10;

// Focus on text on start
text.focus();

// Set difficulty to value in ls or medium
let difficulty =
	localStorage.getItem("difficulty") !== null
		? localStorage.getItem("difficulty")
		: "medium";

// Set difficulty select value
difficultySelect.value =
	localStorage.getItem("difficulty") !== null
		? localStorage.getItem("difficulty")
		: "medium";

/////////////////////////////////////////////
// Functions
/////////////////////////////////////////////

// Generate random word from array
const getRandomWord = function () {
	return words[Math.floor(Math.random() * words.length)];
};

// Add word to DOM
const addWordToDOM = function () {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
};

// Game over & show end screen
const gameOver = function () {
	endgameEl.innerHTML = `
		<h1>Time ran out</h1>
		<p>You final score is ${score}</p>
		<button onclick="location.reload()">Reload</button>
	`;

	endgameEl.style.display = "flex";
};

// Update score
const updateScore = function () {
	score++;
	scoreEl.innerHTML = score;
};

// Update time
const updateTime = function () {
	time--;
	timeEl.innerHTML = time + "s";

	if (time === 0) {
		clearInterval(timeInterval);
		gameOver();
	}
};

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

addWordToDOM();

/////////////////////////////////////////////
// Event Listeners

text.addEventListener("input", function (e) {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();

		// Clear
		e.target.value = "";

		if (difficulty === "hard") time += 2;
		if (difficulty === "medium") time += 3;
		if (difficulty === "easy") time += 5;
	}

	// updateTime();
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", e => {
	difficulty = e.target.value;
	localStorage.setItem("difficulty", difficulty);
});
