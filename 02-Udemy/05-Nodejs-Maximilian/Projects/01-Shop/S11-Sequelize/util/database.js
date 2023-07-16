const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-mysql-application', 'root', 'OSAMA.123', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;
