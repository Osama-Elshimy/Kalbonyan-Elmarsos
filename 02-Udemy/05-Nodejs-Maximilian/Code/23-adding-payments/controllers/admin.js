const { validationResult } = require('express-validator');

const Product = require('../models/Product');

const fileHelper = require('../util/file');

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
	const image = req.file;

	if (!image) {
		return res.status(422).render('admin/add-product', {
			pageTitle: 'Add Product',
			path: '/admin/add-product',
			product: {
				title,
				price,
				description,
			},
			validationErrors: [],
			errorMessage: 'Attached file is not an image.',
		});
	}

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).render('admin/add-product', {
			pageTitle: 'Add Product',
			path: '/admin/add-product',
			errorMessage: errors.array()[0].msg,
			product: {
				title,
				price,
				description,
			},
			validationErrors: errors.array(),
		});
	}

	const imageUrl = image.path;

	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		userId: req.user,
	});

	try {
		await product.save();
		res.redirect('/admin/products');
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.postEditProduct = async (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	const image = req.file;

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

		if (image) {
			// Delete the old image ONLY if a new image is uploaded
			fileHelper.deleteFile(product.imageUrl);
			product.imageUrl = image.path;
		}

		await product.save();
		res.redirect('/admin/products');
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
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
		console.log('ERROR IS COMING FROM GET PRODUCTS');
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

exports.deleteProduct = async (req, res, next) => {
	const prodId = req.params.productId;

	try {
		const product = await Product.findById(prodId);
		if (!product) return next(new Error('Product not found!'));

		fileHelper.deleteFile(product.imageUrl);

		await Product.deleteOne({ _id: prodId, userId: req.user._id });

		res.status(200).json({ message: 'Success!' });
	} catch (err) {
		res.status(500).json({ message: 'Deleting product failed!' });
	}
};
