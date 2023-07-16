import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
	name: "counter",
	initialState: initialCounterState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter += action.payload;
		},
		toggle(state) {
			state.showCounter = !state.showCounter;
		},
		reset(state) {
			state.counter = 0;
		},
	},
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
