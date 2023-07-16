// Core node modules
const path = require('path');

// Core express modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// File modules
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

// Database modules
const mongoose = require('mongoose');
const User = require('./models/User');

//////////////////////////////////////////////

const MONGODB_URI =
	'mongodb+srv://Osama-node-course:Jz7gWc9F0bji85E7@node-course-cluster.g9qzhvu.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions',
});

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use(async (req, res, next) => {
	if (!req.session.user) return next();
	try {
		const user = await User.findById(req.session.user._id);
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
	}
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

//////////////////////////////////////////////
// Database

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(MONGODB_URI);

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
