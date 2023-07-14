"use strict";

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

/////////////////////////////////////
// Functions

// Show input error message
const showError = function (input, message) {
	const formControl = input.parentElement;
	formControl.className = "form-control error";

	const small = formControl.querySelector("small");
	small.innerText = message;
};

// Show success outline
const showSuccess = function (input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
};

// Check email is valid
const checkEmail = function (email) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!re.test(email.value.trim())) {
		showError(email, "Email is not valid");
		return;
	}

	showSuccess(email);
};

// Check required fields
const checkRequiredFields = function (inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is required`);
			return;
		}
		showSuccess(input);
	});
};

// Check input length
const checkLength = function (input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
		return;
	}
	if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
		return;
	}
	showSuccess(input);
};

// Check passwords match
const checkPasswordsMatch = function (input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, "Passwords do not match");
		return;
	}
};

// Get field name
const getFieldName = function (input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event listeners
form.addEventListener("submit", function (e) {
	e.preventDefault();

	checkRequiredFields([username, email, password, password2]);
	checkLength(username, 4, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});
