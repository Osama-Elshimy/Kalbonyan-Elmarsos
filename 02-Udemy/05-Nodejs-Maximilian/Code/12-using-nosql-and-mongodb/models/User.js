const { ObjectId } = require('mongodb');

const getDb = require('../util/database').getDb;

class User {
	constructor(name, email, cart, id) {
		this.name = name;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}

	async save() {
		const db = getDb();
		try {
			return await db.collection('users').insertOne(this);
		} catch (err) {
			console.log(err);
		}
	}

	addToCart(product) {
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
				productId: new ObjectId(product._id),
				quantity: newQuantity,
			});
		}

		// Update the cart items either way
		const updatedCart = {
			items: updatedCartItems,
		};

		// Update the cart in the database
		const db = getDb();
		return db
			.collection('users')
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
	}

	async getCart() {
		const db = getDb();

		const productIds = this.cart.items.map(item => {
			return item.productId;
		});

		try {
			const products = await db
				.collection('products')
				.find({ _id: { $in: productIds } })
				.toArray();

			return products.map(p => {
				return {
					...p,
					quantity: this.cart.items.find(i => {
						return i.productId.toString() === p._id.toString();
					}).quantity,
				};
			});
		} catch (err) {
			console.log(err);
		}
	}

	async deleteItemFromCart(productId) {
		const updatedCartItems = this.cart.items.filter(item => {
			return item.productId.toString() !== productId.toString();
		});

		const db = getDb();
		try {
			return await db
				.collection('users')
				.updateOne(
					{ _id: new ObjectId(this._id) },
					{ $set: { cart: { items: updatedCartItems } } }
				);
		} catch (err) {
			console.log(err);
		}
	}

	async addOrder() {
		const db = getDb();
		try {
			const products = await this.getCart();
			const order = {
				items: products,
				user: {
					_id: new ObjectId(this._id),
					name: this.name,
				},
			};

			await db.collection('orders').insertOne(order);
			return await db
				.collection('users')
				.updateOne(
					{ _id: new ObjectId(this._id) },
					{ $set: { cart: { items: [] } } }
				);
		} catch (err) {
			console.log(err);
		}
	}

	async getOrders() {
		const db = getDb();
		try {
			return await db
				.collection('orders')
				.find({ 'user._id': new ObjectId(this._id) })
				.toArray();
		} catch (err) {
			console.log(err);
		}
	}

	static async findById(userId) {
		const db = getDb();
		try {
			const user = await db
				.collection('users')
				.findOne({ _id: new ObjectId(userId) });
			return user;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = User;
