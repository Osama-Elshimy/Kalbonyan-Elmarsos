// Select elements from the DOM
const buttons = document.querySelectorAll(".btn-add-task");
const taskLists = document.querySelectorAll(".task-list");
const sections = document.querySelectorAll(".section");

const btnAddTask = document.querySelector(".modal-button-add");
const btnCanelTask = document.querySelector(".modal-button-cancel");

const modal = document.querySelector(".modal");
const modalTitleInput = document.querySelector("#task-title");
const overlay = document.querySelector(".overlay");

let activeList = [...taskLists][0];

let savedTasks = [];

function init() {
	renderTasksFromLocalStorage();
	updateLocalStorage();
}
init();

////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////

// Create and return new task (li) element
function createNewTask(title) {
	// Create a new HTML element
	const html = `
	<li draggable="true" id="draggable-list" class="task">
			<p class="task-description">${title}</p>
			<div>
				<ion-icon class="delete-icon icon" name="trash-outline" aria-label="trash outline" role="img" class="md icon-small hydrated" draggable="false"></ion-icon>
				<ion-icon class="edit-icon icon" name="pencil-outline" aria-label="pencil outline" role="img" class="md icon-small hydrated" draggable="false"></ion-icon>
			</div>
	</li>
		`;

	return html;
}

// Render new task to DOM
const addNewTask = function (title) {
	activeList.insertAdjacentHTML("beforeend", createNewTask(title));
};

const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

////////////////////////////////////////////////
// Event Listeners
////////////////////////////////////////////////

// Open Modal
buttons.forEach(button => {
	button.addEventListener("click", function () {
		openModal();

		setTimeout(() => {
			modalTitleInput.focus();
		}, 50);

		const parentSection = button.closest(".section");
		activeList = parentSection.querySelector(".task-list");
	});
});

// Close Modal
btnCanelTask.addEventListener("click", function () {
	// Clear the input field & close modal
	closeModal();
	modalTitleInput.value = "";
});

// Confirm Adding new task when the add button is clicked
btnAddTask.addEventListener("click", function (event) {
	event.preventDefault();

	// TEMP
	if (modalTitleInput.value.trim() === "") {
		closeModal();
		return;
	}

	addNewTask(modalTitleInput.value);

	updateLocalStorage();

	// Clear the input field & close modal
	closeModal();
	modalTitleInput.value = "";
});

// Confirm Adding new task when Enter is pressed
modalTitleInput.addEventListener("keyup", function (event) {
	event.preventDefault();

	if (event.keyCode === 13 || event.key === "Enter") {
		// TEMP
		if (modalTitleInput.value.trim() === "") {
			closeModal();
			return;
		}

		addNewTask(modalTitleInput.value);

		// saveTasksInLocalStorage();
		updateLocalStorage();

		// Clear the input field & close modal
		closeModal();
		modalTitleInput.value = "";
	}
});

// Delete task
taskLists.forEach(taskList =>
	taskList.addEventListener("click", function (event) {
		if (event.target.classList.contains("delete-icon")) {
			const parentLi = event.target.closest("li");
			parentLi.remove();
		}

		updateLocalStorage();
	})
);

// Edit task
taskLists.forEach(taskList =>
	taskList.addEventListener("click", function (event) {
		if (!event.target.classList.contains("edit-icon")) return;

		const parentLi = event.target.closest("li");

		const taskTitle = parentLi.querySelector(".task-description");
		const currentTitle = taskTitle.innerText;

		const inputField = document.createElement("input");
		inputField.setAttribute("type", "text");
		inputField.setAttribute("value", currentTitle);
		inputField.classList.add("task-description");
		taskTitle.replaceWith(inputField);
		inputField.focus();
		inputField.setSelectionRange(currentTitle.length, currentTitle.length);

		function handleEnterOrBlur() {
			const newTitle = inputField.value;
			const newTitleElement = document.createElement("p");
			newTitleElement.classList.add("task-description");
			newTitleElement.innerText = newTitle;
			inputField.replaceWith(newTitleElement);

			updateLocalStorage();
		}

		let keyPressed = false;

		inputField.addEventListener("keyup", function (event) {
			if (event.keyCode === 13 || event.key === "Enter") {
				keyPressed = true;
				handleEnterOrBlur();
			}
		});

		inputField.addEventListener("blur", function () {
			// Check if the Enter was pressed
			if (keyPressed) {
				// Reset the flag variable to false
				keyPressed = false;
				// Exit the function without doing anything else
				return;
			}
			// Else trigger the event function
			handleEnterOrBlur();
		});
	})
);

////////////////////////////////////////////////
// Local Storage
////////////////////////////////////////////////

// Render tasks from local storage
function renderTasksFromLocalStorage() {
	savedTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

	if (savedTasks.length === 0) return;

	const notStartedSection = document.querySelector(".section__not-started ul");
	const inProgressSection = document.querySelector(".section__in-progress ul");
	const completedSection = document.querySelector(".section__completed ul");

	// Get saved tasks from local storage
	savedTasks.forEach(task => {
		const li = createNewTask(task.taskTitle);

		if (task.status === "Not started") {
			notStartedSection.insertAdjacentHTML("beforeend", li);
		} else if (task.status === "In progress") {
			inProgressSection.insertAdjacentHTML("beforeend", li);
		} else if (task.status === "Completed") {
			completedSection.insertAdjacentHTML("beforeend", li);
		}
	});
}

////////////////////////////////////////////////

// Update Local storage
function updateLocalStorage() {
	// Get the current tasks from the DOM
	const notStartedTasks = document.querySelector(
		".section__not-started .task-list"
	).children;

	const inProgressTasks = document.querySelector(
		".section__in-progress .task-list"
	).children;

	const completedTasks = document.querySelector(
		".section__completed .task-list"
	).children;

	// Create an array of tasks for each section
	const notStartedTasksArray = [];
	for (let task of notStartedTasks) {
		notStartedTasksArray.push({
			taskTitle: task.querySelector(".task-description").textContent,
			status: "Not started",
		});
	}

	const inProgressTasksArray = [];
	for (let task of inProgressTasks) {
		inProgressTasksArray.push({
			taskTitle: task.querySelector(".task-description").textContent,
			status: "In progress",
		});
	}

	const completedTasksArray = [];
	for (let task of completedTasks) {
		completedTasksArray.push({
			taskTitle: task.querySelector(".task-description").textContent,
			status: "Completed",
		});
	}

	// Merge the arrays into one array
	const allTasksArray = [
		...notStartedTasksArray,
		...inProgressTasksArray,
		...completedTasksArray,
	];

	// Save the tasks to local storage
	localStorage.setItem("tasks", JSON.stringify(allTasksArray));
}

////////////////////////////////////////////////
// Dran and drop (with mouse)
////////////////////////////////////////////////

let dragging = null;

taskLists.forEach(task => {
	task.addEventListener("dragstart", function (event) {
		if (event.target.id === "draggable-list") {
			event.target.classList.add("dragging");
			dragging = event.target; // event.target === li elemnt
			event.dataTransfer.setData("text/html", dragging);
		}
	});

	task.addEventListener("dragover", function (event) {
		// task is ul element
		event.preventDefault();

		// sorting
		const node = event.target; /// Node === dragged over element
		if (node !== dragging && node.nodeName === "LI") {
			const draggedOver = node.getBoundingClientRect();
			const draggedOverMiddleY = draggedOver.top + draggedOver.height / 2; // Math :)

			const mouseY = event.clientY;
			if (mouseY < draggedOverMiddleY) {
				task.insertBefore(dragging, node);
				return;
			} else {
				task.insertBefore(dragging, node.nextSibling);
				return;
			}
		}
	});

	task.addEventListener("dragend", function (event) {
		event.target.classList.remove("dragging");
		dragging = null;

		updateLocalStorage();
	});
});

sections.forEach(section => {
	section.addEventListener("dragover", function (event) {
		event.preventDefault();
		this.classList.add("drag-over");
	});

	section.addEventListener("dragleave", function (event) {
		event.preventDefault();
		this.classList.remove("drag-over");
	});

	section.addEventListener("drop", function (event) {
		event.preventDefault();
		this.classList.remove("drag-over");

		const node = this.querySelector(".task-list"); // Node is ul
		if (node !== dragging && node.nodeName === "LI") {
			const draggedOver = node.getBoundingClientRect();
			const draggedOverMiddleY = draggedOver.top + draggedOver.height / 2;
			const mouseY = event.clientY;
			if (mouseY < draggedOverMiddleY) {
				task.insertBefore(dragging, node);
			} else {
				task.insertBefore(dragging, node.nextSibling);
			}
		}

		const task = document.querySelector(".dragging");
		if (task) {
			const targetSection = event.target.closest(".section"); // Section
			const taskList = targetSection.querySelector(".task-list");
			if (taskList.childElementCount === 0) {
				taskList.append(task);
			}
		}
		updateLocalStorage();
	});
});

//////////////////////////////////////////
// Touch screens
//////////////////////////////////////////

// Touch event handler functions
let targetSection;
let touchStartX, touchStartY;

// Add touch event listeners to draggable items
taskLists.forEach(task => {
	// Touch event handler for starting a drag
	task.addEventListener("touchstart", function (event) {
		if (event.target.nodeName === "INPUT") return;
		if (event.target.classList.contains("icon")) return;

		dragging = event.target.closest(".task");

		// Store the initial touch coordinates
		touchStartX = event.touches[0].clientX;
		touchStartY = event.touches[0].clientY;

		// Add dragging class to dragged item
		dragging.classList.add("dragging");
	});

	// Touch event handler for ending a drag
	task.addEventListener("touchend", function (event) {
		let touch = event.changedTouches[0];

		// Check if user dragged the element or just touched it
		if (touch.clientY === touchStartY) {
			dragging.classList.remove("dragging");
			return;
		}

		let minDistance = Infinity;
		for (let i = 0; i < sections.length; i++) {
			let section = sections[i];
			let rect = section.getBoundingClientRect();
			let distance = Math.hypot(
				touch.clientX - rect.left - rect.width / 2,
				touch.clientY - rect.top - rect.height / 2
			);
			if (distance < minDistance) {
				minDistance = distance;
				targetSection = section;
			}
		}

		// Remove dragging class from dragged item
		if (!dragging) return;
		dragging.classList.remove("dragging");
		event.target.closest(".section").classList.remove("drag-over");

		// Move the dragged item to the target section's task list
		targetSection.querySelector(".task-list").appendChild(dragging);

		// Return to normal styles
		sections.forEach(section => section.classList.remove("drag-over"));
		dragging.style.transform = `translate(0, 0)`;

		dragging = null;

		updateLocalStorage();
	});
});

// Add touch event listeners to sections for drag over and drag leave
sections.forEach(section => {
	section.addEventListener("touchmove", touchMove);
	section.addEventListener("touchleave", touchLeave);
});

function touchMove(event) {
	event.preventDefault();

	// Finde closest section to movement
	let touch = event.touches[0];
	let endX = touch.pageX;
	let endY = touch.pageY;
	let distanceMoved = Math.hypot(endX - touchStartX, endY - touchStartY);
	if (distanceMoved > 10) {
		// adjust this threshold as needed
		let minDistance = Infinity;
		for (let i = 0; i < sections.length; i++) {
			let section = sections[i];
			let rect = section.getBoundingClientRect();
			let distanceToSection = Math.hypot(
				touch.clientX - rect.left - rect.width / 2,
				touch.clientY - rect.top - rect.height / 2
			);
			if (distanceToSection < minDistance) {
				minDistance = distanceToSection;
				targetSection = section;
			}
		}
	}

	// Calculate the distance the finger has moved since the touch start
	const touchX = event.touches[0].clientX;
	const touchY = event.touches[0].clientY;
	const deltaX = touchX - touchStartX;
	const deltaY = touchY - touchStartY;

	if (!dragging) return;
	// Move the dragged item using CSS transform
	dragging.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

	// Add drag-over class to the section
	targetSection.classList.add("drag-over");
}

function touchLeave(event) {
	// Remove drag-over class from the section
	event.target.closest(".section").classList.remove("drag-over");
}

//////////////////////////////////////////

let currentLi = null;
let initialPos = null;
let currentPos = null;
let diff = 0;
isTouchMoving = false;

function handleTouchStart(event) {
	if (event.target.nodeName === "INPUT") return;
	if (event.target.classList.contains("icon")) return;

	currentLi = event.target.closest(".task");
	if (!currentLi) return;

	initialPos = event.touches[0].clientY;
	isTouchMoving = false;
}

function handleTouchMove(event) {
	event.preventDefault();

	if (event.target.nodeName === "INPUT") return;
	if (event.target.classList.contains("icon")) return;

	if (!currentLi) return;

	currentPos = event.touches[0].clientY;
	diff = currentPos - initialPos;

	if (Math.abs(diff) < 10) return;

	isTouchMoving = true;

	currentLi.style.transform = `translateY(${diff}px)`;

	const ul = currentLi.closest(".task-list");
	const liArray = [...ul.querySelectorAll(".task")];

	for (const li of liArray) {
		if (li === currentLi) continue;

		const rect = li.getBoundingClientRect();
		const mid = (rect.bottom + rect.top) / 2;

		if (currentPos > mid) {
			li.classList.add("hover-below");
			li.classList.remove("hover-above");
		} else {
			li.classList.add("hover-above");
			li.classList.remove("hover-below");
		}
	}
}

function handleTouchEnd() {
	if (Math.abs(diff) < 10 || !isTouchMoving) return;
	if (!currentLi) return;

	currentLi.style.transform = "";

	const ul = currentLi.closest(".task-list");
	const liArray = [...ul.querySelectorAll(".task")];
	const newIndex = liArray.indexOf(currentLi);

	let i = 0;
	for (const li of liArray) {
		if (li === currentLi) continue;

		const rect = li.getBoundingClientRect();
		const mid = (rect.bottom + rect.top) / 2;

		if (currentPos > mid && newIndex > i) i++;
		if (currentPos < mid && newIndex < i) i--;
	}

	ul.insertBefore(currentLi, liArray[i]);

	document
		.querySelectorAll(".task")
		.forEach(t => t.classList.remove("hover-above", "hover-below"));

	currentLi = null;
	initialPos = null;
	currentPos = null;
	diff = 0;
}

taskLists.forEach(taskList => {
	taskList.addEventListener("touchstart", handleTouchStart);
	taskList.addEventListener("touchmove", handleTouchMove);
	taskList.addEventListener("touchend", handleTouchEnd);
});
