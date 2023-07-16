const Product = require('../models/Product');

exports.getIndex = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Home Page',
			path: '/',
			hasProducts: products.length > 0,
		});
	});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All Products',
			path: '/products',
			hasProducts: products.length > 0,
		});
	});
};

exports.getCart = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('shop/cart', {
			prods: products,
			pageTitle: 'Your Cart',
			path: '/cart',
			hasProducts: products.length > 0,
		});
	});
};

exports.getOrders = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('shop/orders', {
			prods: products,
			pageTitle: 'Your Orders',
			path: '/order',
			hasProducts: products.length > 0,
		});
	});
};

exports.getCheckout = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('shop/checkout', {
			prods: products,
			pageTitle: 'Checkout',
			path: '/checkout',
			hasProducts: products.length > 0,
		});
	});
};

/* exports.getShop = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
			hasProducts: products.length > 0,
		});
	});
}; */
