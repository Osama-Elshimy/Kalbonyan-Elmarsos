const register = (res, req) => {
	res.send('register user');
};

const login = (res, req) => {
	res.send('login user');
};

const updateUser = (res, req) => {
	res.send('updateUser');
};

export { register, login, updateUser };
