import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
	module.hot.accept();
}

///////////////////////////////////////

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;

		recipeView.renderSpinner();

		// 1) Loading Recipe
		await model.loadRecipe(id);

		// 2) Rendering Recipe
		recipeView.render(model.state.recipe);
	} catch (err) {
		console.error(err);
		recipeView.renderError();
	}
};

const controlSearchResults = async function () {
	try {
		resultsView.renderSpinner();

		// 1) Get search query
		const query = searchView.getQuery();
		if (!query) return;

		// 2) Load search results
		await model.loadSearchResults(query);

		// 3) Render results
		// console.log(model.state.search.results);
		resultsView.render(model.state.search.results);
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
};

init();
controlSearchResults();
