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
	countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
	countriesContainer.insertAdjacentText("beforeend", msg);
	countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// Promises and Fetch API - Modern Way

const getJSON = function (url, errorMsg = "Something went wrong!") {
	return fetch(url).then(response => {
		if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

		return response.json();
	});
};

/* const getCountry = function (country) {
	// Country 1
	const request = fetch(`https://restcountries.com/v2/name/${country}`)
		.then(response => {
			console.log(response);

			if (!response.ok)
				throw new Error(`Country not found! ${response.status}`);

			return response.json();
		})
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
}; */

const getCountry = function (country) {
	// Country 1
	getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found!")
		.then(data => {
			renderCountry(data[0]);

			const neighbour = data[0].borders?.[0];

			if (!neighbour) throw new Error("No neighbour found!");

			// Country 2
			return getJSON(
				`https://restcountries.com/v2/alpha/${neighbour}`,
				"Country not found!"
			);
		})

		.then(data => renderCountry(data, "neighbour"))
		.catch(err => {
			console.error(`${err} 💥💥💥`);
			renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
		})
		.finally(() => {
			countriesContainer.style.opacity = 1;
		});
};

/* btn.addEventListener("click", function (e) {
	getCountry("qatar");
}); */

// getCountry("bambozia");
// getCountry("japan");
// getCountry("sudan");

/////////////////////////////////////
// Promisifying The Geolocation API

const getPosition = function () {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

getPosition()
	.then(position => console.log(position))
	.catch(err => console.error(err));

// console.log("Getting position");

/* const whereAmI = function () {
	getPosition()
		.then(position => {
			const { latitude: lat, longitude: lng } = position.coords;

			return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
		})
		.then(response => {
			if (!response.ok)
				throw new Error(`Problem with geocoding! ${response.status}`);

			return response.json();
		})
		.then(data => {
			// console.log(data);

			console.log(`You're in ${data.city}, ${data.country}.`);

			return fetch(`https://restcountries.com/v2/name/${data.country}`)
				.then(response => {
					if (!response.ok)
						throw new Error(`Country not found! ${response.status}`);

					return response.json();
				})
				.then(data => {
					// console.log(data);
					renderCountry(data[0]);
				});
		})
		.catch(error => console.error(`${error.message} 💥`))
		.finally(() => {
			// Not necesseray
			countriesContainer.style.opacity = 1;
		});
}; */

const whereAmI = async function () {
	try {
		// Geolocation
		const position = await getPosition();
		const { latitude: lat, longitude: lng } = position.coords;

		// Reverse Geocoding
		const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);

		if (!resGeo.ok) throw new Error("Problem getting location data");

		const dataGeo = await resGeo.json();
		// console.log(dataGeo)

		// Country data
		const response = await fetch(
			`https://restcountries.com/v2/name/${dataGeo.country}`
		);

		if (!response.ok) throw new Error("Problem getting country");
		// console.log(response);

		const data = await response.json();
		// console.log(data);

		renderCountry(data[0]);

		return `You are in ${dataGeo.city}, ${dataGeo.country}`;
	} catch (err) {
		console.error(`💥 ${err}`);
		renderError(`💥 ${err.message}`);

		// Reject promise returned from async function
		throw err;
	}
};

btn.addEventListener("click", whereAmI);

console.log("1: Will get location");

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location')

(async function () {
	try {
		const city = await whereAmI();
		console.log(`2: ${city}`);
	} catch (err) {
		console.error(`2: ${err.message} 💥`);
	}
	console.log("3: Finished getting location");
})();

//////////////////////////////////////
// Running Promises in Parallel

const get3Countries = async function (c1, c2, c3) {
	try {
		// const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
		// const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
		// const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

		// console.log(data1.capital, data2.capital, data3.capital);

		const data = await Promise.all([
			getJSON(`https://restcountries.com/v2/name/${c1}`),
			getJSON(`https://restcountries.com/v2/name/${c2}`),
			getJSON(`https://restcountries.com/v2/name/${c3}`),
		]);

		console.log(data.map(country => country[0].capital));
	} catch (error) {
		console.error(`💥 ${error}`);
	}
};

get3Countries("egypt", "qatar", "turkey");
