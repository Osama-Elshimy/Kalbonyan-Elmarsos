const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
	"Bernard Arnault",
	"Elon Musk",
	"Jeff Bezos",
	"Larry Ellison",
	"Warren Buffett",
	"Bill Gates",
	"Carlos Slim Helu",
	"Mukesh Ambani",
	"Steve Ballmer",
	"Larry Page",
];

// Store list items
const listItems = [];

let dragStartIndex;

///////////////////////////////////////////////
// Functions

const dragStart = function () {
	dragStartIndex = +this.closest("li").getAttribute("data-index");
};

const dragEnter = function () {
	this.classList.add("over");
};

const dragLeave = function () {
	this.classList.remove("over");
};

const dragOver = function (e) {
	e.preventDefault();
};

const dragDrop = function () {
	const dragEndIndex = +this.getAttribute("data-index");
	swapItems(dragStartIndex, dragEndIndex);

	this.classList.remove("over");
};

// Swap list items that are drag and drop
const swapItems = function (fromIndex, toIndex) {
	const itemOne = listItems[fromIndex].querySelector(".draggable");
	const itemTwo = listItems[toIndex].querySelector(".draggable");

	listItems[fromIndex].appendChild(itemTwo);
	listItems[toIndex].appendChild(itemOne);
};

// Check the order of list items
const checkOrder = function () {
	listItems.forEach((listItem, index) => {
		const personName = listItem.querySelector(".draggable").innerText.trim();

		if (personName !== richestPeople[index]) {
			listItem.classList.add("wrong");
		} else {
			listItem.classList.remove("wrong");
			listItem.classList.add("right");
		}
	});
};

const addEventListeners = function () {
	const draggables = document.querySelectorAll(".draggable");
	const dragListItems = document.querySelectorAll(".draggable-list li");

	draggables.forEach(draggable => {
		draggable.addEventListener("dragstart", dragStart);
	});

	dragListItems.forEach(item => {
		item.addEventListener("dragover", dragOver);
		item.addEventListener("drop", dragDrop);
		item.addEventListener("dragenter", dragEnter);
		item.addEventListener("dragleave", dragLeave);
	});
};

// Insert list items into DOM
const createList = function () {
	[...richestPeople]
		.map(a => ({ value: a, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(a => a.value)
		.forEach((person, index) => {
			const listItem = document.createElement("li");

			listItem.setAttribute("data-index", index);

			listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

			listItems.push(listItem);

			draggable_list.appendChild(listItem);
		});

	addEventListeners();
};

createList();

///////////////////////////////////////////////
// Event Listeners
check.addEventListener("click", checkOrder);
