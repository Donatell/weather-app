const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageTitle = document.querySelector('#message-title');
const messageText = document.querySelector('#message-text');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	messageText.textContent = '';
	messageTitle.textContent = 'Fetching weather...';

	const location = search.value;
	fetch(`/getweather?location=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageTitle.textContent = 'Error';
				messageText.textContent = data.error;
			} else {
				messageTitle.textContent = 'Weather in ' + data.locationName;
				messageText.textContent = `The weather is ${data.weatherDescription}. It's ${data.temperature} ` + 
										  `degrees outside, feels like ${data.feelsLike}. The humidity is ${data.humidity}%`;
			}
		});
	});
});