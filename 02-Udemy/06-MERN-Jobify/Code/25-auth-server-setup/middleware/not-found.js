const notFoundMiddleware = (req, res, next) => {
	res.status(404).send('Route does not exist');
};

export default notFoundMiddleware;
