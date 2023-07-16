const Product = require('../models/Product');
const Order = require('../models/Order');

exports.getIndex = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
			hasProducts: products.length > 0,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All Products',
			path: '/products',
			hasProducts: products.length > 0,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getProduct = async (req, res, next) => {
	const prodId = req.params.productId;

	try {
		const product = await Product.findById(prodId);
		res.render('shop/product-detail', {
			product: product,
			pageTitle: product.title,
			path: '/products',
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getCart = async (req, res, next) => {
	try {
		const user = await req.user.populate('cart.items.productId');
		const products = user.cart.items;
		console.log(products);
		res.render('shop/cart', {
			pageTitle: 'Your Cart',
			path: '/cart',
			products: products,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.postCart = async (req, res, next) => {
	const prodId = req.body.productId;

	try {
		const product = await Product.findById(prodId);
		await req.user.addToCart(product);
		res.redirect('/cart');
	} catch (err) {
		console.log(err);
	}
};

exports.postCartDeleteProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	try {
		await req.user.removeFromCart(prodId);

		res.redirect('/cart');
	} catch (err) {
		console.log(err);
	}
};

exports.postOrder = async (req, res, next) => {
	try {
		const user = await req.user.populate('cart.items.productId');
		const products = user.cart.items.map(item => {
			return { quantity: item.quantity, product: { ...item.productId._doc } };
		});

		const order = new Order({
			user: {
				name: req.user.name,
				userId: req.user,
			},
			products: products,
		});

		await order.save();

		await req.user.clearCart();

		res.redirect('/orders');
	} catch (err) {
		console.log(err);
	}
};

exports.getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({ 'user.userId': req.user._id });
		// console.log(orders);

		res.render('shop/orders', {
			pageTitle: 'Your Orders',
			path: '/order',
			orders: orders,
			hasOrders: orders.length > 0,
		});
	} catch (err) {
		console.log(err);
	}
};
