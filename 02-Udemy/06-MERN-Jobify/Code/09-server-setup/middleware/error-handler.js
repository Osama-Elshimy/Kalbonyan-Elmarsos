const errorHandlerMiddleware = (err, req, res, next) => {
	return res.status(500).json({ msg: 'There was an error with the server.' });
};

export default errorHandlerMiddleware;
