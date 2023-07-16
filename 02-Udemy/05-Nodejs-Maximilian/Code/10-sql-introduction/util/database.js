const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node-mysql-application',
	password: 'OSAMA.123',
});

module.exports = pool.promise();
