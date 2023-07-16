// Core node modules
const path = require('path');

// Core express modules
const express = require('express');
const bodyParser = require('body-parser');

// File modules
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const db = require('./util/database');

////////////////////////////////////////////

const app = express();

// db.execute('SELECT * FROM products')
// 	.then(result => {
// 		console.log(result[0][0], result[1]);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
