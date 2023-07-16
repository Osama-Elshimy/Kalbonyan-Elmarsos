const path = require('path');

const express = require('express');

const prodcutsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', prodcutsController.getAddProduct);

router.post('/add-product', prodcutsController.postAddProduct);

module.exports = router;
