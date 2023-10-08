"use stict"

const weatherBlock1 = document.querySelector('#weather1');
const weatherBlock2 = document.querySelector('#weather2');
const weatherBlock3 = document.querySelector('#weather3');

async function loadWeather(weatherBlock, server) {
	weatherBlock.innerHTML = `
		<div class="weather__loading">
			<img src="img/loading.gif" alt="Loading...">
		</div>`;

	const response = await fetch(server, { method: 'GET' });
	const responseResult = await response.json();

	if (response.ok) {
		getWeather(responseResult, weatherBlock);
	} else {
		weatherBlock.innerHTML = responseResult.message;
	}
}

function getWeather(data, weatherBlock) {
	const location = data.name;
	const temp = Math.round(data.main.temp);
	const feelsLike = Math.round(data.main.feels_like);
	const weatherStatus = data.weather[0].main;
	const weatherIcon = data.weather[0].icon;

	const template = `	
	<div class="weather__header">
		<div class="weather__main">
			<div class="weather__city">${location}</div>
			<div class="weather__status">${weatherStatus}</div>
			<div class="weather__temp">${temp}</div>
			<div class="weather__feels-like">Feels like: ${feelsLike}</div>
		</div>
		<div class="weather__icon">
			<img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
		</div>
	</div>`;

	weatherBlock.innerHTML = template;
}

if (weatherBlock1) {
	const server1 = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=461961aa97c56877cab67894204f73f0';
	loadWeather(weatherBlock1, server1);
}

if (weatherBlock2) {
	const server2 = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Chornobay&appid=461961aa97c56877cab67894204f73f0';
	loadWeather(weatherBlock2, server2);
}

if (weatherBlock3) {
	const server3 = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Irkliiv&appid=461961aa97c56877cab67894204f73f0';
	loadWeather(weatherBlock3, server3);
}


