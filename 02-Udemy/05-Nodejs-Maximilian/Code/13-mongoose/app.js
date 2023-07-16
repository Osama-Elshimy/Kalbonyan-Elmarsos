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
const mongoose = require('mongoose');
const User = require('./models/User');

//////////////////////////////////////////////

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
	try {
		const user = await User.findById('643bba4dc6fdee9eedebb4f7');
		req.user = user;
		// console.log(req.user);
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

const URL =
	'mongodb+srv://Osama-node-course:Jz7gWc9F0bji85E7@node-course-cluster.g9qzhvu.mongodb.net/shop?retryWrites=true&w=majority';

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(URL);

	let user = await User.findOne();
	if (!user) {
		user = new User({
			name: 'Osama',
			email: 'Osama@elshimy.com',
			cart: { items: [] },
		});
	}

	user.save();

	app.listen(3000);
}
