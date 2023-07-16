let io;

module.exports = {
	init: httpServer => {
		io = require('socket.io', {
			cors: {
				origin: 'http://localhost:3000',
				methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
			},
		})(httpServer);
		return io;
	},

	getIO: () => {
		if (!io) {
			throw new Error('Socket.io not initialized!');
		}
		return io;
	},
};
