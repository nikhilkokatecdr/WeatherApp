const apiKey = '365b5a4f45msh8b41bfcbadfb510p1dc8d9jsn75766db49d25';
const apiHost = 'weather-api138.p.rapidapi.com';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': apiKey,
		'x-rapidapi-host': apiHost
	}
};

function toCelsius(kelvin) {
	return (kelvin - 273.15).toFixed(2);
}

// Fetch weather for entered city
async function getWeather(city) {
	try {
		document.getElementById('cityName').innerText = city;

		const url = `https://${apiHost}/weather?city_name=${city}`;
		const response = await fetch(url, options);
		const result = await response.json();

		console.log(result);

		// Cards Info
		document.getElementById('temp2').innerHTML = toCelsius(result.main.temp);
		document.getElementById('speed2').innerHTML = result.wind.speed;
		document.getElementById('humidity2').innerHTML = result.main.humidity;

		// Main Info
		document.getElementById('temp').innerHTML = toCelsius(result.main.temp);
		document.getElementById('feels_like').innerHTML = toCelsius(result.main.feels_like);
		document.getElementById('temp_min').innerHTML = toCelsius(result.main.temp_min);
		document.getElementById('temp_max').innerHTML = toCelsius(result.main.temp_max);
		document.getElementById('speed').innerHTML = result.wind.speed;
		document.getElementById('deg').innerHTML = result.wind.deg;
		document.getElementById('humidity').innerHTML = result.main.humidity;
		document.getElementById('pressure').innerHTML = result.main.pressure;
		document.getElementById('main').innerHTML = result.weather[0].main;
		document.getElementById('description').innerHTML = result.weather[0].description;
		document.getElementById('sunrise').innerHTML = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
		document.getElementById('sunset').innerHTML = new Date(result.sys.sunset * 1000).toLocaleTimeString();

	} catch (error) {
		console.error('Error fetching weather:', error);
		alert("Weather data not found for " + city);
	}
}

// Search Handler
document.getElementById("submit").addEventListener("click", function (e) {
	e.preventDefault();
	const city = document.getElementById("city").value.trim();
	if (city) getWeather(city);
});

// Populate common cities weather in table
async function populateCommonCitiesWeather() {
	const cities = ["Pune", "Mumbai", "Delhi", "Bangalore", "Bhopal", "Kolkata"];
	const rows = document.querySelectorAll("tbody tr");

	for (let i = 0; i < cities.length; i++) {
		const city = cities[i];
		const url = `https://${apiHost}/weather?city_name=${city}`;
		try {
			const res = await fetch(url, options);
			const data = await res.json();

			const row = rows[i].children;

			// Update table with Celsius values
			row[1].innerText = toCelsius(data.main.temp);
			row[2].innerText = toCelsius(data.main.feels_like);
			row[3].innerText = toCelsius(data.main.temp_min);
			row[4].innerText = toCelsius(data.main.temp_max);
			row[5].innerText = data.wind.speed;
			row[6].innerText = data.wind.deg;
			row[7].innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
			row[8].innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString();

		} catch (error) {
			console.error(`Error loading ${city}:`, error);
			const row = rows[i].children;
			for (let j = 1; j < row.length; j++) {
				row[j].innerText = "N/A";
			}
		}
	}
}

// Initial load
getWeather("Pune");
populateCommonCitiesWeather();

//Add on