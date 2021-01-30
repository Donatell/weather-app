const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weather = require("./utils/weather.js");

const app = express();

// set port of Heroku or 3000 for local hosted tests
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine, views and partials paths
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// render homepage
app.get('', (req, res) => {
	res.render('index', {
		title: 'Homepage',
		name: 'Donat Meirmanov'
	});
});

// render about page
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Donat Meirmanov'
	});
});

// render help page
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		helpText: 'Need help?',
		name: 'Donat Meirmanov'
	});
});

// render weather page
app.get('/weather', (req, res) => {
	res.render('weather', {
		name: 'Donat Meirmanov',
		title: 'Weather'
		
	})
})

// query and send back weather info by location name  
app.get('/getweather', (req, res) => {
	if (!req.query.location) {
		return res.send({
			error: 'Please provide a location'
		});
	};
	
	weather(req.query.location, (error, weatherData) => {
		if (error) {
		  res.send({
			  error: error
			});
		} else {
		  res.send(weatherData);
		}
	  });
});

// render 404 for help articles
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Help article not found',
		name: 'Donat Meirmanov'
	});
});

// render 404
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Page not found',
		name: 'Donat Meirmanov'
	});
});

app.listen(port, () => {
	console.log('The server is up on port ' + port);
});