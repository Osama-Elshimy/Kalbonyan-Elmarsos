const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = async (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	try {
		req.user.createProduct({
			title: title,
			price: price,
			imageUrl: imageUrl,
			description: description,
		});
		res.redirect('/admin/products');
	} catch (err) {
		console.log(err);
	}
};

exports.getEditProduct = async (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) return res.redirect('/admin/edit-product');

	const prodId = req.params.productId;

	try {
		const [product] = await req.user.getProducts({ where: { id: prodId } });
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
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;

	const product = await Product.findByPk(prodId);
	product.title = updatedTitle;
	product.price = updatedPrice;
	product.imageUrl = updatedImageUrl;
	product.description = updatedDescription;
	await product.save();

	res.redirect('/admin/products');
};

exports.getProducts = async (req, res, next) => {
	try {
		const products = await req.user.getProducts();
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
		const product = await Product.findByPk(prodId);
		await product.destroy();
		res.redirect('/admin/products');
	} catch (err) {
		console.log(err);
	}
};
