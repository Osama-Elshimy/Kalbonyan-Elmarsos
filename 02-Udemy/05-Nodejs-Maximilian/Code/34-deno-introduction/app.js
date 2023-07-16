const http = require('http');

const server = http.createServer((req, res) => {
	res.end('Hello World (FROM NODE)!');
});

server.listen(3000);
