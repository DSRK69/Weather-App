const searchDiv = document.querySelector('.search-div');
const humidityDiv = document.querySelector('.humidity-div');
const windDiv = document.querySelector('.wind-div');
const locationNameDiv = document.querySelector('.location-name');
const locationCountryDiv = document.querySelector('.location-country');
const celsiusTempDiv = document.querySelector('.celsius-temp');
const fahrenheitTempDiv = document.querySelector('.fahrenheit-temp');
const imgDiv = document.querySelector('.current-weather-img');

const searchButton = document.querySelector('.search-btn');
const searchBar = document.querySelector('.search-bar');
const APIKey = '0223557b0e8447b6906222219240802';
let weatherLocation;

async function getWeatherAPI () {
    weatherLocation = searchBar.value;
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=' + APIKey + '&q=' + weatherLocation, {
            mode: 'cors'
        });
        const responseData = await response.json();
        console.log(responseData);
        setHumidity(responseData);
        setWind(responseData);
        setLocationName(responseData);
        setCountryName(responseData);
        setCelsius(responseData);
        setFahrenheit(responseData);
        setImg(responseData);
    } catch(err) {
        console.log(err.message);
    }
}

searchButton.addEventListener('click', () => {
    getWeatherAPI();
});

function setHumidity(locationData) {
    humidityDiv.innerHTML = 'Humidity: ' + locationData.current.humidity;
}
function setWind(locationData) {
    windDiv.innerHTML = 'Wind: ' + locationData.current.wind_kph;
}
function setLocationName(locationData) {
    locationNameDiv.innerHTML = 'Location: ' + locationData.location.name;
}
function setCountryName(locationData) {
    locationCountryDiv.innerHTML = 'Country: ' + locationData.location.country;
}
function setCelsius(locationData) {
    celsiusTempDiv.innerHTML = 'Celsius: ' + locationData.current.temp_c;
}
function setFahrenheit(locationData) {
    fahrenheitTempDiv.innerHTML = 'Fahrenheit: ' + locationData.current.temp_f;
}
function setImg(locationData) {
    const imgLink = 'https://' + locationData.current.condition.icon.replace('//', '');
    console.log(imgLink);
    imgDiv.src = imgLink;
}