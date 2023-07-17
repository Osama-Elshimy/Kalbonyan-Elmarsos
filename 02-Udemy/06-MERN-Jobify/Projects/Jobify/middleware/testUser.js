import { BadRequestError } from '../errors/index.js';

const testUser = (req, res, next) => {
	if (req.user.userId === '64a74e129ac89e731fcd27b4') {
		throw new BadRequestError('Test User. Read Only.');
	}
	next();
};

export default testUser;
