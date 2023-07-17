module.exports = {
	plugins: [
		require('autoprefixer'),
		require('cssnano'),
		require('postcss-preset-env')({ stage: 2 }),
	],
};
