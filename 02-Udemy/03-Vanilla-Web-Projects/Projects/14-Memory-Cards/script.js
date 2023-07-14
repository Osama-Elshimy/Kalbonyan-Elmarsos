const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

/////////////////////////////////////////////

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Get cards from local storage
const getCardsData = function () {
	const cards = JSON.parse(localStorage.getItem("cards"));
	return cards === null ? [] : cards;
};

const cardsData = getCardsData();

/////////////////////////////////////////////
// Functions

// Create all cards
const createCards = function () {
	cardsData.forEach((data, index) => createCard(data, index));
};

// Show number of cards
const updateCurrentText = function () {
	currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
};

// Create a single card in the DOM
const createCard = function (data, index) {
	const card = document.createElement("div");
	card.classList.add("card");

	if (index === 0) card.classList.add("active");

	card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${data.answer}
        </p>
      </div>
    </div>
  `;

	card.addEventListener("click", function (e) {
		card.classList.toggle("show-answer");
	});

	// Add to DOM cards
	cardsEl.push(card);

	cardsContainer.appendChild(card);

	updateCurrentText();
};

// Add card to local storage
const setCardsData = function (cards) {
	localStorage.setItem("cards", JSON.stringify(cards));
	window.location.reload();
};

createCards();

/////////////////////////////////////////////
// Event listeners

// Next button
nextBtn.addEventListener("click", function (e) {
	cardsEl[currentActiveCard].className = "card left";

	currentActiveCard++;

	if (currentActiveCard > cardsEl.length - 1)
		currentActiveCard = cardsEl.length - 1;

	cardsEl[currentActiveCard].className = "card active";

	updateCurrentText();
});

// Prev button
prevBtn.addEventListener("click", function (e) {
	cardsEl[currentActiveCard].className = "card right";

	currentActiveCard--;

	if (currentActiveCard < 0) currentActiveCard = 0;

	cardsEl[currentActiveCard].className = "card active";

	updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", function (e) {
	questionEl.focus();
	addContainer.classList.add("show");
});

// Hide add container
hideBtn.addEventListener("click", function (e) {
	addContainer.classList.remove("show");
});

// Add new card
addCardBtn.addEventListener("click", function (e) {
	const question = questionEl.value;
	const answer = answerEl.value;

	if (!question.trim() || !answer.trim()) return;

	const newCard = { question, answer };

	createCard(newCard);

	questionEl.value = "";
	answerEl.value = "";

	addContainer.classList.remove("show");

	cardsData.push(newCard);
	setCardsData(cardsData);
});

// Clear cards button
clearBtn.addEventListener("click", function (e) {
	localStorage.clear();
	cardsContainer.innerHTML = "";
	window.location.reload();
});
