const search = document.querySelector("#search");
const submitBtn = document.querySelector("#submit");
const random = document.querySelector("#random");
const mealsEl = document.querySelector("#meals");
const resultHeading = document.querySelector("#result-heading");
const singleMealEl = document.querySelector("#single-meal");

//////////////////////////////////
// Search meal and fetch from API
const searchMeal = function (e) {
	e.preventDefault();

	// Clear single meal
	singleMealEl.innerHTML = "";

	// Get search term
	const term = search.value;

	// Check for empty
	if (!term) {
		alert("Please enter a search term");
		return;
	}
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
		.then(response => response.json())
		.then(data => {
			resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

			if (!data.meals)
				resultHeading.innerHTML = `<p>There are no search results for '${term}'. Try again!</p>`;

			mealsEl.innerHTML = data.meals
				.map(
					meal => `<div class="meal">
				<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
				<div class="meal-info" data-meal-id="${meal.idMeal}">
					<h3>${meal.strMeal}</h3>
				</div>
			</div>`
				)
				.join("");

			// Clear search input
			search.value = "";
		});
};

// Add meal to DOM
const addMealToDOM = function (meal) {
	const ingredients = [];

	for (let i = 1; i < 20; i++) {
		if (!meal[`strIngredient${i}`]) break;

		ingredients.push(
			`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
		);
	}

	singleMealEl.innerHTML = `
		<div class="single-meal">
			<h1>${meal.strMeal}</h1>
			<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
			<div class="single-meal-info">
				${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
				${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
			</div>
		
			<div class="main">
				<p>${meal.strInstructions}</p>
				<h2>Ingredients</h2>
				<ul>
					${ingredients.map(ing => `<li>${ing}</li>`).join("")}
				</ul>
			</div>
		</div>
	`;
};

// Fetch meal by ID
const getMealById = function (meaID) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meaID}`)
		.then(response => response.json())
		.then(data => {
			const meal = data.meals[0];

			addMealToDOM(meal);
		});
};

// Fetch random meal from API
const getRandomMeal = function () {
	// Clear meals and heading
	mealsEl.innerHTML = "";
	resultHeading.innerHTML = "";

	fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
		.then(res => res.json())
		.then(data => {
			const meal = data.meals[0];

			addMealToDOM(meal);
		});
};

//////////////////////////////////
// Event listeners
submitBtn.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", e => {
	// path is supported in chrome but not in firefox
	const path = e.path || (e.composedPath && e.composedPath());
	const mealInfo = path.find(item => {
		if (!item.classList) return false;
		return item.classList.contains("meal-info");
	});

	if (!mealInfo) return;

	const mealID = mealInfo.dataset.mealId;
	getMealById(mealID);
});
