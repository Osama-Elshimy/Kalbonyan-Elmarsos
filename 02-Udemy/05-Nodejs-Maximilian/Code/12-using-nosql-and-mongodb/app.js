// Core node modules
const path = require('path');

// Core express modules
const express = require('express');
const bodyParser = require('body-parser');

// File modules
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

// Database modules
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/User');

//////////////////////////////////////////////

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
	try {
		const user = await User.findById('643a2ce651ab3daa31c4c391');
		req.user = new User(user.name, user.email, user.cart, user._id);
		next();
	} catch (err) {
		console.log(err);
	}
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//////////////////////////////////////////////
// Database

mongoConnect(() => {
	app.listen(3000);
});
