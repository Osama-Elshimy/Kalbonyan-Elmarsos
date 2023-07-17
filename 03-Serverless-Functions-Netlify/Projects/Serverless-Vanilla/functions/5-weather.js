require('dotenv').config();
const axios = require('axios');

exports.handler = async (event, context, cb) => {
	const method = event.httpMethod;

	if (method !== 'POST') {
		return {
			statusCode: 405,
			body: 'Only POST Requests Allowed',
		};
	}

	const { city } = JSON.parse(event.body);

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

	try {
		const resp = await axios.get(url);
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 200,
			body: JSON.stringify(resp.data),
		};
	} catch (error) {
		return {
			statusCode: 404,
			body: JSON.stringify(error),
		};
	}
};
