import React, { useState, useRef, useReducer } from "react";

// const initialInputState = {
// 	value: "",
// 	isTouched: false,
// };

// const inputStateReducer = (state, action) => {
// 	if (action.type === "INPUT") {
// 		return { value: action.value, isTouched: state.isTouched };
// 	}
// 	if (action.type === "BLUR") {
// 		return { isTouched: true, value: state.value };
// 	}
// 	if (action.type === "RESET") {
// 		return { isTouched: false, value: "" };
// 	}
// 	return inputStateReducer;
// };

const useInput = validateValue => {
	// const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

	// const valueIsValid = validateValue(inputState.value);
	// const hasError = !valueIsValid && inputState.isTouched;

	// const valueChangeHandler = (event) => {
	//   dispatch({ type: 'INPUT', value: event.target.value });
	// };

	// const inputBlurHandler = (event) => {
	//   dispatch({ type: 'BLUR' });
	// };

	// const reset = () => {
	//   dispatch({ type: 'RESET' });
	// };

	// return {
	//   value: inputState.value,
	//   isValid: valueIsValid,
	//   hasError,
	//   valueChangeHandler,
	//   inputBlurHandler,
	//   reset,
	// };

	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);
	const inputRef = useRef();

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = function (event) {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = function (event) {
		setIsTouched(true);
	};

	const reset = function (event) {
		setEnteredValue("");
		inputRef.current.blur();
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
		inputRef,
	};
};

export default useInput;
