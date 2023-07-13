'use strict';

/////////////////////////////////////////////////
////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Osama Elshimy',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-06T21:31:17.178Z',
    '2022-11-05T07:42:02.383Z',
    '2022-11-03T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-07-11T23:36:17.929Z',
    '2022-07-22T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account2 = {
  owner: 'Ibrahim Mansour',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
////////////////////////////////////////////////
// Functions

// Format movements dates
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

/////////////////////////////////////////////////
// Format Currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Display movements
const displayMovements = function (acc, sort = false) {
  // Delete the hard-coded movements
  containerMovements.innerHTML = '';

  // Create a sorted copy of the movements
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // Add the new movements
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Display movements dates
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    // Formated movements
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}€</div>

      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/////////////////////////////////////////////////

// Calculate and display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

/////////////////////////////////////////////////

// Calculate account summary
const calcDisplaySummary = function (acc) {
  // Calculate and display deposits
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  // Calculate and display withdrawls
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  // Calcuate and display interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * `${acc.interestRate}`) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

/////////////////////////////////////////////////

// Computing Usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

/////////////////////////////////////////////////

// Update UI
const updateUI = function (acc) {
  // Display movments
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

/////////////////////////////////////////////////
// Log out timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

/////////////////////////////////////////////////
////////////////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(account1);
// containerApp.style.opacity = 100;

////////////////////////////////////////////////

// User Login
btnLogin.addEventListener('click', function (e) {
  // Prevent reload after submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value.trim().toLowerCase()
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value.trim()) {
    // Display message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Display UI
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields and lose focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

////////////////////////////////////////////////

// Transfers
btnTransfer.addEventListener('click', function (e) {
  // Prevent reload after submitting
  e.preventDefault();

  // Get recipient user
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value.trim().toLowerCase()
  );

  // Calculate amount
  const amount = +inputTransferAmount.value;

  // Transfer if:
  // 1) recipeint is defined
  // 2) balance > amount
  // 3) amount > 0
  // 4) receiver acount is NOT current account (Users can't transfer money to themselves)
  if (
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username &&
    currentAccount.balance >= amount &&
    amount > 0
  ) {
    // Add negative movement to current user
    currentAccount.movements.push(-amount);

    // Add positive movement to receiver account
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Lose foucs of input fields if transfer is a success
    inputTransferTo.blur();
    inputTransferAmount.blur();
  }

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // Update UI
  updateUI(currentAccount);

  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

////////////////////////////////////////////////
// Request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // Get loan amount
  const loan = Math.floor(inputLoanAmount.value);

  // Check if any deposit is >= 10 % of loan requested
  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)) {
    setTimeout(function () {
      // Add loan amount to movements
      currentAccount.movements.push(loan);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Lost focus of input field if the loan is approved
      inputLoanAmount.blur();

      // Udate UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  // Clear input field
  inputLoanAmount.value = '';
});

////////////////////////////////////////////////
// Sort movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  // Sort movements
  displayMovements(currentAccount, !sorted);

  // To make unsorting available
  sorted = !sorted;
});

////////////////////////////////////////////////
// Close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Check credentials
  if (
    inputCloseUsername.value.trim().toLowerCase() === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    // Get current account index
    const deletedAccountIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete user from data
    accounts.splice(deletedAccountIndex, 1);

    // Log the user out - Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;

    // Clear input fields and lose focus
    inputCloseUsername.value = inputClosePin.value = '';
    inputCloseUsername.blur();
    inputClosePin.blur();
  }
});

/////////////////////////////////////////////////
////////////////////////////////////////////////
// A function that returns a random integer between two numbers
const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
