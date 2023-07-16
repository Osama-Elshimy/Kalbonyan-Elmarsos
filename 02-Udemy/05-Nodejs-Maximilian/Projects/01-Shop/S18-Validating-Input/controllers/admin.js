const { validationResult } = require('express-validator');

const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		errorMessage: null,
		product: {
			title: '',
			price: '',
			description: '',
			imageUrl: '',
		},
		validationErrors: [],
	});
};

exports.postAddProduct = async (req, res, next) => {
	const title = req.body.title;
	const price = req.body.price;
	const description = req.body.description;
	const imageUrl = req.body.imageUrl;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render('admin/add-product', {
			pageTitle: 'Add Product',
			path: '/admin/add-product',
			errorMessage: errors.array()[0].msg,
			product: {
				title,
				price,
				description,
				imageUrl,
			},
			validationErrors: errors.array(),
		});
	}

	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		userId: req.user,
	});

	try {
		await product.save();
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

exports.getEditProduct = async (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) return res.redirect('/admin/edit-product');

	const prodId = req.params.productId;

	try {
		const product = await Product.findById(prodId);
		if (!product) return res.redirect('/');

		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			errorMessage: null,
			product,
			editing: editMode,
			validationErrors: [],
		});
	} catch (err) {
		console.log(err);
	}
};

exports.postEditProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	const updatedImageUrl = req.body.imageUrl;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			errorMessage: errors.array()[0].msg,
			product: {
				title: updatedTitle,
				price: updatedPrice,
				description: updatedDescription,
				imageUrl: updatedImageUrl,
				_id: prodId,
			},
			validationErrors: errors.array(),
		});
	}

	try {
		const product = await Product.findById(prodId);

		// Check if the user is the owner of the product
		if (product.userId.toString() !== req.user._id.toString())
			return res.redirect('/');

		product.title = updatedTitle;
		product.price = updatedPrice;
		product.description = updatedDescription;
		product.imageUrl = updatedImageUrl;

		await product.save();
		res.redirect('/admin/products');
	} catch (err) {
		console.log(err);
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.find({ userId: req.user._id });

		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products',
			hasProducts: products.length > 0,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.postDeleteProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	try {
		await Product.deleteOne({ _id: prodId, userId: req.user._id });
		res.redirect('/admin/products');
	} catch (err) {
		console.log(err);
	}
};
