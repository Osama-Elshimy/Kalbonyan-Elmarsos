const balance = document.querySelector("#balance");
const money_plus = document.querySelector("#money-plus");
const money_minus = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");

//////////////////////////////////////////

const localStorageTransactions = JSON.parse(
	localStorage.getItem("transactions")
);

let transactions =
	localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
const addTransaction = function (e) {
	e.preventDefault();

	if (!text.value) {
		alert("Please add a description");
		return;
	}
	if (!amount.value) {
		alert("Please add amount");
		return;
	}

	const transaction = {
		id: generateID(),
		text: text.value,
		amount: +amount.value,
	};

	transactions.push(transaction);

	addTransactionDOM(transaction);

	updateValues();

	updateLocalStorage();

	text.value = "";
	amount.value = "";
};

// Generate random ID
function generateID() {
	return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM list
const addTransactionDOM = function (transaction) {
	// Get sign (positive or nagative)
	const sign = transaction.amount < 0 ? "-" : "+";

	const item = document.createElement("li");

	// Add class based on value
	item.classList.add(transaction.amount < 0 ? "minus" : "plus");

	item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
	<button class="delete-btn" onclick="removeTransaction(${
		transaction.id
	})">x</button>
  `;

	list.appendChild(item);
};

// Update balance
const updateValues = function () {
	const amounts = transactions.map(transaction => transaction.amount);

	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	const income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);
	console.log(income);

	const expense =
		amounts
			.filter(item => item < 0)
			.reduce((acc, item) => (acc += item), 0)
			.toFixed(2) * -1;
	console.log(expense);

	balance.innerText = `$${total}`;
	money_plus.innerText = `$${income}`;
	money_minus.innerText = `$${expense}`;
};

// Remove transaction by ID
const removeTransaction = function (id) {
	transactions = transactions.filter(transaction => transaction.id !== id);
	console.log("clicked");

	updateLocalStorage();

	init();
};

// Update local storage transactions
const updateLocalStorage = function () {
	localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Init app
function init() {
	list.innerHTML = "";

	transactions.forEach(addTransactionDOM);
	updateValues();
}

init();

/////////////////////////////////////////////////////
// Event listeners
form.addEventListener("submit", addTransaction);
