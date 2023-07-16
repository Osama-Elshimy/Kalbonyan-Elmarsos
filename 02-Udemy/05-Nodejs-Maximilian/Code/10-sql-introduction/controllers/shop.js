const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/index', {
				prods: rows,
				pageTitle: 'Home Page',
				path: '/',
				hasProducts: rows.length > 0,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/product-list', {
				prods: rows,
				pageTitle: 'All Products',
				path: '/products',
				hasProducts: rows.length > 0,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;

	// Product.findById(prodId, product => {
	// 	res.render('shop/product-detail', {
	// 		product: product,
	// 		pageTitle: product.title,
	// 		path: '/products',
	// 	});
	// });

	Product.findById(prodId)
		.then(([[product]]) => {
			console.log('FROM GET PRODUCT');
			console.log(product);
			res.render('shop/product-detail', {
				product: product,
				pageTitle: product.title,
				path: '/products',
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	Cart.getCart(cart => {
		Product.fetchAll(products => {
			const cartProducts = [];
			for (let product of products) {
				const cartProductData = cart.products.find(
					prod => prod.id === product.id
				);
				if (cartProductData) {
					cartProducts.push({ productData: product, qty: cartProductData.qty });
				}
			}
			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: '/cart',
				products: cartProducts,
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, product => {
		Cart.addProduct(prodId, product.price);
	});
	res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, product => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart');
	});
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Your Orders',
		path: '/order',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout',
	});
};
