import React from "react";

import useInput from "../hooks/use-input";

const SimpleInput = props => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangedHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInput(value => value.trim() !== "");

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangedHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useInput(value => emailRegex.test(value));

	// Form validation
	let formIsValid = false;
	if (enteredNameIsValid && enteredEmailIsValid) formIsValid = true;

	// Form submission
	const formSubmissionHandler = function (event) {
		event.preventDefault();

		if (!enteredNameIsValid || !enteredEmailIsValid) return;

		console.log(enteredName);
		console.log(enteredEmail);

		resetNameInput();
		resetEmailInput();
	};

	const nameInputClasses = nameInputHasError
		? "form-control invalid"
		: "form-control";

	const emailInputClasses = emailInputHasError
		? "form-control invalid"
		: "form-control";

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameChangedHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameInputHasError && (
					<p className="error-text">Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Your E-Mail</label>
				<input
					type="email"
					id="email"
					onChange={emailChangedHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailInputHasError && (
					<p className="error-text">Email must be valid.</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
