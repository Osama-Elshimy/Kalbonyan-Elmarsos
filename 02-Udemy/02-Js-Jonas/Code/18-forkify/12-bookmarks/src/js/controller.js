import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

/*
if (module.hot) {
	module.hot.accept();
}
*/

///////////////////////////////////////

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;

		recipeView.renderSpinner();

		// 0) Update results view to mark selected search results
		resultsView.update(model.getSearchResultsPage());

		// 1) Updating bookmarks view
		bookmarksView.update(model.state.bookmarks);

		// 2) Loading Recipe
		await model.loadRecipe(id);

		// 3) Rendering Recipe
		recipeView.render(model.state.recipe);
	} catch (err) {
		recipeView.renderError();
		console.error(err);
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
		// resultsView.render(model.state.search.results);
		resultsView.render(model.getSearchResultsPage());

		// 4) Render initial pagination buttons
		paginationView.render(model.state.search);
	} catch (err) {
		console.error(err);
	}
};

const controlPagination = function (goToPage) {
	console.log(goToPage);
	// 1) Render NEW results
	resultsView.render(model.getSearchResultsPage(goToPage));

	// 2) Render NEW pagination buttons
	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	// 1) Update the recipe servings (in the state)
	model.updateServings(newServings);

	// 2) Update the recipe view
	// recipeView.render(model.state.recipe);
	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	// 1) Add/remove bookmark
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.deleteBookmark(model.state.recipe.id);

	// 2) Update recipe view
	recipeView.update(model.state.recipe);

	// 3) Render bookmarks
	bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
	bookmarksView.render(model.state.bookmarks);
};

const init = function () {
	bookmarksView.addHandlerRender(controlBookmarks);
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	// controlServings();
};

init();

const clearBookmarks = function () {
	localStorage.clear("bookmarks");
};
// clearBookmarks();
