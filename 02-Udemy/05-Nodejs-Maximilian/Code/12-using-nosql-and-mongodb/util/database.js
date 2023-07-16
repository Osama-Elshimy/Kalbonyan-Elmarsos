const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const URL =
	'mongodb+srv://Osama-node-course:Jz7gWc9F0bji85E7@node-course-cluster.g9qzhvu.mongodb.net/shop?retryWrites=true&w=majority';
let _db;

const mongoConnect = async function (callback) {
	try {
		const client = await MongoClient.connect(URL);

		console.log('Connected!');
		_db = client.db();
		callback();
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const getDb = function () {
	if (_db) return _db;
	throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
