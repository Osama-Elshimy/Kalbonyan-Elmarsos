const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);

// const { ObjectId } = require('mongodb');

// const getDb = require('../util/database').getDb;

// class Product {
// 	constructor(title, price, description, imageUrl, id, userId) {
// 		this.title = title;
// 		this.price = price;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this._id = id ? new ObjectId(id) : null;
// 		this.userId = userId;
// 	}

// 	async save() {
// 		const db = getDb();
// 		let dbOperation;

// 		// If the product has an id, we're updating an existing product
// 		if (this._id) {
// 			dbOperation = db
// 				.collection('products')
// 				.updateOne({ _id: this._id }, { $set: this });
// 		} else {
// 			// If the product has no id, we're creating a new product
// 			dbOperation = db.collection('products').insertOne(this);
// 		}
// 		try {
// 			const result = await dbOperation;
// 			console.log(result);
// 			return result;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}

// 	static async fetchAll() {
// 		const db = getDb();
// 		try {
// 			const products = await db.collection('products').find().toArray();
// 			return products;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}

// 	static async findById(productId) {
// 		const db = getDb();
// 		try {
// 			const product = await db
// 				.collection('products')
// 				.findOne({ _id: new ObjectId(productId) });
// 			return product;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}

// 	static async deleteById(productId) {
// 		const db = getDb();
// 		try {
// 			const product = await db
// 				.collection('products')
// 				.deleteOne({ _id: new ObjectId(productId) });
// 			return product;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// }

// module.exports = Product;
