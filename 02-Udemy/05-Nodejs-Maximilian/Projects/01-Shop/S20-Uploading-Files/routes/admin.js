const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post(
	'/add-product',
	isAuth,
	[
		body('title')
			.isString()
			.isLength({ min: 3 })
			.trim()
			.withMessage('Title is required'),
		body('price').isNumeric().withMessage('Price must be a number'),
		body('description')
			.isLength({ min: 5, max: 400 })
			.trim()
			.withMessage('Description must be between 5 and 400 characters'),
	],
	adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
	'/edit-product',
	isAuth,
	[
		body('title')
			.isString()
			.isLength({ min: 3 })
			.trim()
			.withMessage('Title is required'),
		body('price').isNumeric().withMessage('Price must be a number'),
		body('description')
			.isLength({ min: 5, max: 400 })
			.trim()
			.withMessage('Description must be between 5 and 400 characters'),
	],
	adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
