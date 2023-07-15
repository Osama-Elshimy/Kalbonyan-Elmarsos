'use strict';

///////////////////////////////////////
// Activating Strict Mode
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio';
// const private = 534;

///////////////////////////////////////
// Functions
function logger() {
	console.log('My name is Jonas');
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
	const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
	return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number('23');

///////////////////////////////////////
// Function Declarations vs. Expressions

// Function declaration
function calcAge1(birthYeah) {
	return 2037 - birthYeah;
}
const age1 = calcAge1(1991);

// Function expression
const calcAge2 = function (birthYeah) {
	return 2037 - birthYeah;
};
const age2 = calcAge2(1991);

console.log(age1, age2);

///////////////////////////////////////
// Arrow functions

const calcAge3 = birthYeah => 2037 - birthYeah;
const age3 = calcAge3(1991);
console.log(age3);

const YearsUntilRetirement = (birthYeah, firstName) => {
	const age = 2037 - birthYeah;
	const retirement = 65 - age;
	// return retirement;
	return `${firstName} retires in ${retirement} years`;
};

console.log(YearsUntilRetirement(1991, 'Jonas'));
console.log(YearsUntilRetirement(1980, 'Bob'));

///////////////////////////////////////
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
	return fruit * 4;
}

function fruitProcessor(apples, oranges) {
	const applePieces = cutFruitPieces(apples);
	const orangePieces = cutFruitPieces(oranges);

	const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
	return juice;
}
console.log(fruitProcessor(2, 3));

///////////////////////////////////////
// Reviewing Functions
const calcAge = function (birthYeah) {
	return 2037 - birthYeah;
};

const yearsUntilRetirement = function (birthYeah, firstName) {
	const age = calcAge(birthYeah);
	const retirement = 65 - age;

	if (retirement > 0) {
		console.log(`${firstName} retires in ${retirement} years`);
		return retirement;
	} else {
		console.log(`${firstName} has already retired 🎉`);
		return -1;
	}
};

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'Mike'));

const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(3, 4, 5));

// Test 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
	if (avgDolphins >= 2 * avgKoalas) {
		console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
	} else if (avgKoalas >= 2 * avgDolphins) {
		console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
	} else {
		console.log('No team wins...');
	}
};
checkWinner(scoreDolphins, scoreKoalas);

checkWinner(576, 111);

// Test 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);

///////////////////////////////////////
// Introduction to Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);
// friends = ['Bob', 'Alice']

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);

///////////////////////////////////////
// Basic Array Operations (Methods)
const friends = ['Michael', 'Steven', 'Peter'];

// Add elements
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

friends.unshift('John');
console.log(friends);

// Remove elements
friends.pop(); // Last
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // First
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

friends.push(23);
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));

if (friends.includes('Steven')) {
	console.log('You have a friend called Steven');
}

///////////////////////////////////////

const calcTip = function (bill) {
	return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};
// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals);

///////////////////////////////////////
// Introduction to Objects
const jonasArray = [
	'Jonas',
	'Schmedtmann',
	2037 - 1991,
	'teacher',
	['Michael', 'Peter', 'Steven'],
];

const jonas1 = {
	firstName: 'Jonas',
	lastName: 'Schmedtmann',
	age: 2037 - 1991,
	job: 'teacher',
	friends: ['Michael', 'Peter', 'Steven'],
};

///////////////////////////////////////
// Dot vs. Bracket Notation
const jonas2 = {
	firstName: 'Jonas',
	lastName: 'Schmedtmann',
	age: 2037 - 1991,
	job: 'teacher',
	friends: ['Michael', 'Peter', 'Steven'],
};
console.log(jonas2);

console.log(jonas2.lastName);
console.log(jonas2['lastName']);

const nameKey = 'Name';
console.log(jonas2['first' + nameKey]);
console.log(jonas2['last' + nameKey]);

// console.log(jonas.'last' + nameKey)

const interestedIn = prompt(
	'What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends'
);

if (jonas2[interestedIn]) {
	console.log(jonas2[interestedIn]);
} else {
	console.log(
		'Wrong request! Choose between firstName, lastName, age, job, and friends'
	);
}

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas2);

///////////////////////////////////////
// Object Methods

const jonas = {
	firstName: 'Jonas',
	lastName: 'Schmedtmann',
	birthYeah: 1991,
	job: 'teacher',
	friends: ['Michael', 'Peter', 'Steven'],
	hasDriversLicense: true,

	// calcAge: function (birthYeah) {
	//   return 2037 - birthYeah;
	// }

	// calcAge: function () {
	//   // console.log(this);
	//   return 2037 - this.birthYeah;
	// }

	calcAge: function () {
		this.age = 2037 - this.birthYeah;
		return this.age;
	},

	getSummary: function () {
		return `${this.firstName} is a ${this.calcAge()}-year old ${
			jonas.job
		}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
	},
};

console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

///////////////////////////////////////

const mark = {
	fullName: 'Mark Miller',
	mass: 78,
	height: 1.69,
	calcBMI: function () {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	},
};

const john = {
	fullName: 'John Smith',
	mass: 92,
	height: 1.95,
	calcBMI: function () {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	},
};

mark.calcBMI();
john.calcBMI();

console.log(mark.bmi, john.bmi);

// "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

if (mark.bmi > john.bmi) {
	console.log(
		`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`
	);
} else if (john.bmi > mark.bmi) {
	console.log(
		`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`
	);
}

///////////////////////////////////////
// Iteration: The for Loop

// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
	console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

///////////////////////////////////////
// Looping Arrays, Breaking and Continuing
const jonas = [
	'Jonas',
	'Schmedtmann',
	2037 - 1991,
	'teacher',
	['Michael', 'Peter', 'Steven'],
	true,
];
const types = [];

// console.log(jonas[0])
// console.log(jonas[1])
// ...
// console.log(jonas[4])
// jonas[5] does NOT exist

for (let i = 0; i < jonas.length; i++) {
	// Reading from jonas array
	console.log(jonas[i], typeof jonas[i]);

	// Filling types array
	// types[i] = typeof jonas[i];
	types.push(typeof jonas[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
	ages.push(2037 - years[i]);
}
console.log(ages);

// continue and break
console.log('--- ONLY STRINGS ---');
for (let i = 0; i < jonas.length; i++) {
	if (typeof jonas[i] !== 'string') continue;

	console.log(jonas[i], typeof jonas[i]);
}

console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < jonas.length; i++) {
	if (typeof jonas[i] === 'number') break;

	console.log(jonas[i], typeof jonas[i]);
}

///////////////////////////////////////
// Looping Backwards and Loops in Loops
const jonas = [
	'Jonas',
	'Schmedtmann',
	2037 - 1991,
	'teacher',
	['Michael', 'Peter', 'Steven'],
	true,
];

// 0, 1, ..., 4
// 4, 3, ..., 0

for (let i = jonas.length - 1; i >= 0; i--) {
	console.log(i, jonas[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
	console.log(`-------- Starting exercise ${exercise}`);

	for (let rep = 1; rep < 6; rep++) {
		console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
	}
}

///////////////////////////////////////
// The while Loop
for (let rep = 1; rep <= 10; rep++) {
	console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {
	// console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
	rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
	console.log(`You rolled a ${dice}`);
	dice = Math.trunc(Math.random() * 6) + 1;
	if (dice === 6) console.log('Loop is about to end...');
}

///////////////////////////////////////////////////

const calcTipTwo = function (bill) {
	return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};
const myBills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const myTips = [];
const myTotals = [];

for (let i = 0; i < myBills.length; i++) {
	const tip = calcTipTwo(myBills[i]);
	myTips.push(tip);
	myTotals.push(tip + myBills[i]);
}
console.log(myBills, myTips, myTotals);

const calcAverageTwo = function (arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		// sum = sum + arr[i];
		sum += arr[i];
	}
	return sum / arr.length;
};
console.log(calcAverageTwo([2, 3, 7]));
console.log(calcAverageTwo(myTotals));
console.log(calcAverageTwo(myTips));
