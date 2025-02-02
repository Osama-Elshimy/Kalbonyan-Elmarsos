const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	resetToken: String,
	resetTokenExpiration: Date,
	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
	},
});

userSchema.methods.addToCart = function (product) {
	// Search for  existing product by index
	const cartProductIndex = this.cart.items.findIndex(cp => {
		return cp.productId.toString() === product._id.toString();
	});

	let newQuantity = 1;
	const updatedCartItems = [...this.cart.items];

	// If the product  is already in the cart, increase the quantity
	if (cartProductIndex >= 0) {
		newQuantity = this.cart.items[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQuantity;
	} else {
		// Else, add the product to the cart
		updatedCartItems.push({
			productId: product._id,
			quantity: newQuantity,
		});
	}

	// Update the cart items either way
	const updatedCart = {
		items: updatedCartItems,
	};
	this.cart = updatedCart;

	// Update the cart in the database
	return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
	const updatedCartItems = this.cart.items.filter(item => {
		return item.productId.toString() !== productId.toString();
	});

	this.cart.items = updatedCartItems;

	return this.save();
};

userSchema.methods.clearCart = function () {
	this.cart = { items: [] };
	return this.save();
};

module.exports = mongoose.model('User', userSchema);
