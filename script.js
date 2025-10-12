// Get references to all HTML elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const temperatureEl = document.getElementById('temperature');
const weatherDescEl = document.getElementById('weather-desc');
const cityNameEl = document.getElementById('city-name');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const pressureEl = document.getElementById('pressure');
const cloudsEl = document.getElementById('clouds');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const weatherIcon = document.getElementById('weather-icon');

// Your new API key for weatherapi.com
const apiKey = '9d95c5e35b324ee484951405251210';

/**
 * Updates the UI with the fetched weather data
 * @param {object} data The weather data from the API
 */
const updateUI = (data) => {
    // Destructure the data for easier access
    const location = data.location;
    const current = data.current;
    const forecast = data.forecast.forecastday[0];

    // Update main display
    cityNameEl.textContent = `${location.name}, ${location.country}`;
    temperatureEl.textContent = `${current.temp_c}°C`;
    weatherDescEl.textContent = current.condition.text;
    // Add "https:" to the icon URL
    weatherIcon.src = `https:${current.condition.icon}`;

    // Update highlights
    humidityEl.textContent = current.humidity;
    windSpeedEl.textContent = current.wind_kph; // This is in kph
    pressureEl.textContent = current.pressure_mb; // This is in mb
    cloudsEl.textContent = current.cloud;
    sunriseEl.textContent = forecast.astro.sunrise;
    sunsetEl.textContent = forecast.astro.sunset;
};

/**
 * Fetches weather data for a given city from weatherapi.com
 * @param {string} city The name of the city
 */
const getWeather = async (city) => {
    cityNameEl.textContent = "Loading...";

    // We use the 'forecast' endpoint to get current weather AND sunrise/sunset times
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the data to inspect it in the console
        updateUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(`Could not fetch weather data for ${city}. Please check the city name.`);
        cityNameEl.textContent = "City not found";
    }
};

// Event Listeners (no changes here)
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

// Load default weather data on page load
window.addEventListener('load', () => {
    getWeather('Bangalore'); // Default city
});