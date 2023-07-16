import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

const AddUser = props => {
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredAge, setEnteredAge] = useState("");
	const [error, setError] = useState();

	const addUserHandler = e => {
		e.preventDefault();

		// Gaurd Clause for empty inputs
		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({
				title: "Invalid input",
				message: "Please enter a valid name and age (non-empty values).",
			});
			return;
		}
		if (+enteredAge <= 0) {
			setError({
				title: "Invalid age",
				message: "Please enter a valid age (greater than zero).",
			});
			return;
		}

		// Forward data to App component
		props.onAddUser(enteredUsername, enteredAge);

		// Clear inputs
		setEnteredUsername("");
		setEnteredAge("");
	};

	const usernameChangeHandler = e => {
		setEnteredUsername(e.target.value);
	};

	const ageChangeHandler = e => {
		setEnteredAge(e.target.value);
	};

	const errorHandler = () => {
		setError(null); // It doesn't have to be null, any falsy value will work
	};

	return (
		<div>
			{error && (
				<ErrorModal
					onConfirm={errorHandler}
					title={error.title}
					message={error.message}
				/>
			)}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						value={enteredUsername}
						onChange={usernameChangeHandler}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						value={enteredAge}
						onChange={ageChangeHandler}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUser;
