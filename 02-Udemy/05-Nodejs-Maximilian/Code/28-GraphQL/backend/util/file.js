const fs = require('fs');
const path = require('path');

const clearImage = function (filePath) {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, err => console.log(err));
};

exports.clearImage = clearImage;
