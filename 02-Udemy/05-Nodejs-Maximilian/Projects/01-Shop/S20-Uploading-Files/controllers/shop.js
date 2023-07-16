const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

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
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.postCart = async (req, res, next) => {
	const prodId = req.body.productId;

	try {
		const product = await Product.findById(prodId);
		await req.user.addToCart(product);
		res.redirect('/cart');
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.postCartDeleteProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	try {
		await req.user.removeFromCart(prodId);

		res.redirect('/cart');
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
				email: req.user.email,
				userId: req.user,
			},
			products: products,
		});

		await order.save();

		await req.user.clearCart();

		res.redirect('/orders');
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({ 'user.userId': req.user._id });

		res.render('shop/orders', {
			pageTitle: 'Your Orders',
			path: '/orders',
			orders: orders,
			hasOrders: orders.length > 0,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.getInvoice = async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const order = await Order.findById(orderId);

		if (!order) {
			return next(new Error('No order found.'));
		}
		if (order.user.userId.toString() !== req.user._id.toString()) {
			return next(new Error('Unauthorized'));
		}

		const invoiceName = `invoice-${orderId}.pdf`;
		const invoicePath = path.join('data', 'invoices', invoiceName);

		const pdfDoc = new PDFDocument();
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `inline; filename=${invoiceName}`);

		pdfDoc.pipe(fs.createWriteStream(invoicePath));
		pdfDoc.pipe(res);

		// Set the font for the document
		pdfDoc.font('Helvetica');

		// Set the title and alignment
		pdfDoc.fontSize(26).text('Invoice', {
			align: 'center',
		});

		// Set the font size and alignment for product details
		pdfDoc.fontSize(14).text('Product Details', {
			align: 'left',
		});

		// Add product details
		let totalPrice = 0;
		order.products.forEach(prod => {
			totalPrice += prod.quantity * prod.product.price;
			pdfDoc
				.fontSize(14)
				.text(
					`${prod.product.title} - ${prod.quantity} x $${prod.product.price}`,
					{
						align: 'left',
					}
				);
		});

		// Set the font size and alignment for total price
		pdfDoc.fontSize(20).text(`Total Price: $${totalPrice}`, {
			align: 'right',
		});

		pdfDoc.end();

		/* This appraoch is acciptable for small files, but not for big ones.

		fs.readFile(invoicePath, (err, data) => {
			if (err) next(err);

			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename=${invoiceName}`);
			res.send(data);
		});
		*/
	} catch (err) {
		next(err);
	}
};
