const Product = require('../models/Product');

exports.getIndex = async (req, res, next) => {
	try {
		const products = await Product.findAll();
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
		const products = await Product.findAll();
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
		const product = await Product.findByPk(prodId);
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
		const cart = await req.user.getCart();
		const products = await cart.getProducts();

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
	let newQuantity = 1;

	try {
		const cart = await req.user.getCart();
		const products = await cart.getProducts({ where: { id: prodId } });

		let product;
		if (products.length > 0) product = products[0];

		if (product) {
			const oldQuantity = product.cartItem.quantity;
			newQuantity = oldQuantity + 1;
		} else {
			product = await Product.findByPk(prodId);
			await cart.addProduct(product, {
				through: { quantity: newQuantity },
			});
		}
		await cart.addProduct(product, {
			through: { quantity: newQuantity },
		});
		res.redirect('/cart');
	} catch (err) {
		console.log(err);
	}
};

exports.postCartDeleteProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	try {
		const cart = await req.user.getCart();
		const [product] = await cart.getProducts({ where: { id: prodId } });
		await product.cartItem.destroy();
		res.redirect('/cart');
	} catch (err) {
		console.log(err);
	}
};

exports.postOrder = async (req, res, next) => {
	try {
		const cart = await req.user.getCart();
		const products = await cart.getProducts();
		const order = await req.user.createOrder();

		await order.addProducts(
			products.map(product => {
				product.orderItem = { quantity: product.cartItem.quantity };
				return product;
			})
		);

		await cart.setProducts(null);

		res.redirect('/orders');
	} catch (err) {
		console.log(err);
	}
};

exports.getOrders = async (req, res, next) => {
	try {
		const orders = await req.user.getOrders({ include: ['products'] });
		console.log(orders);

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
