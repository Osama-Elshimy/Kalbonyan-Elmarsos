// The Module Pattern

const ShoppingCart2 = (function () {
	const cart = [];
	const shippingCost = 10;
	const totalPrice = 237;
	const totalQuantity = 23;

	const addToCart = function (product, quantity) {
		cart.push({ product, quantity });
		console.log(
			`${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
		);
	};

	const orderStock = function (product, quantity) {
		console.log(`${quantity} ${product} ordered from supplier`);
	};

	return {
		addToCart,
		cart,
		totalPrice,
		totalQuantity,
	};
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);
