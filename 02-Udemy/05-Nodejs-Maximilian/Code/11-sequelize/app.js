// Core node modules
const path = require('path');

// Core express modules
const express = require('express');
const bodyParser = require('body-parser');

// File modules
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartItem = require('./models/Cart-Item');
const Order = require('./models/Order');
const OrderItem = require('./models/Order-Item');

//////////////////////////////////////////////

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
	try {
		const user = await User.findByPk(1);
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
	}
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//////////////////////////////////////////////
// Database relations
//////////////////////////////////////////////

// If a user is deleted, all the related products are deleted as well
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });

sequelize
	// .sync({ force: true })
	.sync()
	.then(() => {
		return User.findByPk(1);
	})
	.then(user => {
		if (!user) {
			return User.create({
				name: 'Osama',
				email: 'osama@elshimy.com',
				password: '12345',
			});
		}
		return user;
	})
	.then(user => {
		return user.createCart();
	})
	.then(cart => {})
	.catch(err => {
		console.log(err);
	});

app.listen(3000);
