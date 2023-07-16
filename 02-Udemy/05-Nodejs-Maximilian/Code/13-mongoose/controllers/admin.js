const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = async (req, res, next) => {
	const title = req.body.title;
	const price = req.body.price;
	const description = req.body.description;
	const imageUrl = req.body.imageUrl;
	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		// null,
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
			product: product,
			editing: editMode,
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

	try {
		const product = await Product.findById(prodId);
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
		const products = await Product.find();

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
		await Product.findByIdAndDelete(prodId);
		res.redirect('/admin/products');
	} catch (err) {
		console.log(err);
	}
};
