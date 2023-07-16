import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

let db: Database;

export function connect() {
	const client = new MongoClient();
	client.connectWithUri(
		'mongodb+srv://Osama-node-course:Jz7gWc9F0bji85E7@node-course-cluster.g9qzhvu.mongodb.net/deno?retryWrites=true&w=majority'
	);

	db = client.database('todo-app');
}

export function getDb() {
	return db;
}
