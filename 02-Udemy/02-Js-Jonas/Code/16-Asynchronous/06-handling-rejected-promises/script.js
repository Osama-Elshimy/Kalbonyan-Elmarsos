"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

/* 
  New API URL: https://restcountries.com/v2/
*/

const renderCountry = function (data, className = "") {
	const html = `
  <article class="country ${className}">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
				+data.population / 1000000
			).toFixed(1)} M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

	countriesContainer.insertAdjacentHTML("beforeend", html);
	// countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
	countriesContainer.insertAdjacentText("beforeend", msg);
	// countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// OLD SCHOOL WAY

/*
const getCountryAndNeighbour = function (country) {
	// AJAX call country 1
	const request = new XMLHttpRequest();
	request.open("Get", `https://restcountries.com/v2/name/${country}`);
	request.send();

	request.addEventListener("load", function (e) {
		// console.log(this.responseText);
		// console.log(typeof this.responseText);

		const [data] = JSON.parse(this.responseText);
		console.log(data);

		// Render country 1
		renderCountry(data);

		// Render neighbour country (2)
		const neighbour = data.borders?.[0];

		if (!neighbour) return;

		const request2 = new XMLHttpRequest();
		request2.open("Get", `https://restcountries.com/v2/alpha/${neighbour}`);
		request2.send();

		request2.addEventListener("load", function (e) {
			const data2 = JSON.parse(this.responseText);
			console.log(data2);

			renderCountry(data2, "neighbour");
		});
	});
};
*/

// getCountryAndNeighbour("qatar");
// getCountryAndNeighbour("turkey");

// Callback hell example
/*
setTimeout(() => {
	console.log("1 second passed");
	setTimeout(() => {
		console.log("2 seconds passed");
		setTimeout(() => {
			console.log("3 seconds passed");
			setTimeout(() => {
				console.log("4 seconds passed");
			}, 1000);
		}, 1000);
	}, 1000);
}, 1000);
*/

///////////////////////////////////////
// Promises and Fetch API - Modern Way

/* const getCountry = function (country) {
	const request = fetch(`https://restcountries.com/v2/name/${country}`)
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (data) {
			console.log(data[0]);

			renderCountry(data[0]);
		});
}; */

const getCountry = function (country) {
	// Country 1
	const request = fetch(`https://restcountries.com/v2/name/${country}`)
		.then(response => response.json())
		.then(data => {
			renderCountry(data[0]);

			const neighbour = data[0].borders?.[0];

			if (!neighbour) return;

			// Country 2
			return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
		})
		.then(response => response.json())
		.then(data => renderCountry(data, "neighbour"))
		.catch(err => {
			console.error(`${err} 💥💥💥`);
			renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
		})
		.finally(() => {
			countriesContainer.style.opacity = 1;
		});
};

btn.addEventListener("click", function (e) {
	getCountry("qatar");
});

// getCountry("bambozia");
