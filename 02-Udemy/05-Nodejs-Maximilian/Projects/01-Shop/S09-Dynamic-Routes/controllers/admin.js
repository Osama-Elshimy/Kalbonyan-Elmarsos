const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	const product = new Product(null, title, imageUrl, price, description);
	product.save();
	res.redirect('/products');
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) return res.redirect('/admin/edit-product');

	const prodId = req.params.productId;
	Product.findById(prodId, product => {
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;

	const updatedProduct = new Product(
		prodId,
		updatedTitle,
		updatedImageUrl,
		updatedPrice,
		updatedDescription
	);

	updatedProduct.save();

	res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(products => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products',
			hasProducts: products.length > 0,
		});
	});
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId);
	res.redirect('/admin/products');
};
