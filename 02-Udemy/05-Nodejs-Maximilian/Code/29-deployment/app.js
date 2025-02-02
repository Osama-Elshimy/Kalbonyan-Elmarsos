const dotenv = require('dotenv');
dotenv.config();

// Core node modules
const path = require('path');

// Core express modules
const express = require('express');
const bodyParser = require('body-parser');

// Sessions-authentication-security modules
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');

// Database modules
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/User');

// File modules
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

//////////////////////////////////////////////

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions',
});
const csrfProtection = csrf();

//////////////////////////////////////////////
//////////////////////////////////////////////
// Upload and download package

const multer = require('multer');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

//////////////////////////////////////////////

// HTML engine PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static(__dirname + './views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

// Serving files staically
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);
app.use(csrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
	if (!req.session.user) return next();
	try {
		const user = await User.findById(req.session.user._id);
		if (!user) {
			return next();
		}

		req.user = user;
		next();
	} catch (err) {
		// throw new Error(err);
		next(new Error(err));
	}
});

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
	res.redirect('/500');
});

//////////////////////////////////////////////
// Database and starting the server

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(MONGODB_URI);

	app.listen(3000);
}
