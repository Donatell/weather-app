const request = require('request');
const geocode = require('./geocode.js');

const weather = (address, callback) => {
	geocode(address, (error, locationData) => {
		if (error) {
			callback(error, undefined);
		} else {
			getWeather(locationData, callback);
		}
	});
};

const getWeather = ({ locationName, latitude, longitude }, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_TOKEN}&query=${latitude},${longitude}`;
	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service.', undefined);
		} else if (body.error) {
			callback('Unable to find location.', undefined);
		} else {
			callback(undefined, {
				locationName: locationName,
				weatherDescription: body.current.weather_descriptions[0].toLowerCase(),
				temperature: body.current.temperature,
				feelsLike: body.current.feelslike,
				humidity: body.current.humidity
			});
		}
	});
};

module.exports = weather;
