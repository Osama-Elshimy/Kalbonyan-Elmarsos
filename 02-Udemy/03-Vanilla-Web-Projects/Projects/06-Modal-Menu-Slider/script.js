const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modalContainer = document.getElementById("modal-container");

// Toggle nav
toggle.addEventListener("click", function () {
	document.body.classList.toggle("show-nav");
});

// Show modal
open.addEventListener("click", function (e) {
	modalContainer.classList.add("show-modal");
});

// Hide modal
close.addEventListener("click", function (e) {
	modalContainer.classList.remove("show-modal");
});

// Hide modal on outside click
window.addEventListener("click", function (e) {
	e.target === modalContainer
		? modalContainer.classList.remove("show-modal")
		: false;
});

// Hide modal on pressing 'ESC' key
document.addEventListener("keydown", function (event) {
	if (event.key === "Escape" || event.key === "Esc") {
		modalContainer.classList.remove("show-modal");
	}
});
