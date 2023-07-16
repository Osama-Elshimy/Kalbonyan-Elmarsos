import React from "react";

import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== "";

// Email validation regex
const isEmail = email => {
	// regular expression to match email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const BasicForm = props => {
	const {
		value: enteredFirstName,
		isValid: enteredFirstNameIsValid,
		hasError: firstNameInputHasError,
		valueChangeHandler: firstNameChangedHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstNameInput,
		inputRef: firstNameRef,
	} = useInput(isNotEmpty);

	const {
		value: enteredLastName,
		isValid: enteredLastNameIsValid,
		hasError: lastNameInputHasError,
		valueChangeHandler: lastNameChangedHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastNameInput,
		inputRef: lastNameRef,
	} = useInput(isNotEmpty);

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangedHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
		inputRef: emailRef,
	} = useInput(isEmail);

	let formIsValid = false;
	if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid)
		formIsValid = true;

	const submitHandler = function (event) {
		event.preventDefault();

		if (!formIsValid) return;

		console.log(enteredFirstName);
		console.log(enteredLastName);
		console.log(enteredEmail);

		resetFirstNameInput();
		resetLastNameInput();
		resetEmailInput();
	};

	const firstNameInputClasses = firstNameInputHasError
		? "form-control invalid"
		: "form-control";
	const lastNameInputClasses = lastNameInputHasError
		? "form-control invalid"
		: "form-control";
	const emailInputClasses = emailInputHasError
		? "form-control invalid"
		: "form-control";

	return (
		<form onSubmit={submitHandler}>
			<div className="control-group">
				<div className={firstNameInputClasses}>
					<label htmlFor="name">First Name</label>
					<input
						type="text"
						id="name"
						value={enteredFirstName}
						onChange={firstNameChangedHandler}
						onBlur={firstNameBlurHandler}
						ref={firstNameRef}
					/>
					{firstNameInputHasError && (
						<p className="error-text">First name must not be empty.</p>
					)}
				</div>
				<div className={lastNameInputClasses}>
					<label htmlFor="name">Last Name</label>
					<input
						type="text"
						id="name"
						value={enteredLastName}
						onChange={lastNameChangedHandler}
						onBlur={lastNameBlurHandler}
						ref={lastNameRef}
					/>
					{lastNameInputHasError && (
						<p className="error-text">Last name must not be empty.</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="name">E-Mail Address</label>
				<input
					type="text"
					id="name"
					value={enteredEmail}
					onChange={emailChangedHandler}
					onBlur={emailBlurHandler}
					ref={emailRef}
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

export default BasicForm;
