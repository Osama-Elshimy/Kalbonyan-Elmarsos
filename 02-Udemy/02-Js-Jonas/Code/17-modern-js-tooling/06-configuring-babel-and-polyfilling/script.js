console.log("Importing Module");

import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 5);
add("apples", 4);

console.log(cart);

// Introduction to NPM
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
	cart: [
		{ product: "bread", quantity: 5 },
		{ product: "pizza", quantity: 5 },
	],
	user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
	module.hot.accept();
}

class Person {
	greeting = "Hey";
	constructor(name) {
		this.name = name;

		console.log(`${this.greeting}, ${this.name}`);
	}
}

const osama = new Person("Osama");

console.log("Osama" ?? null);

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve("Promise test").then(x => console.log(x));

import "core-js/stable";

// Poliyfilling async functions
import "regenerator-runtime/runtime";
