'use strict';

console.log('WEATHER SERVICE APP');

let url;

const inputForm = document.querySelector('form')
const address = document.querySelector('input')
const locationName = document.querySelector('#location-name')
const weatherInfo = document.querySelector('#weather-info')
const currentTemp = document.querySelector('#current-temp')
const currentHum = document.querySelector('#current-hum')

inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = address.value
    url = `/weather?city=${city}`

    locationName.textContent = `Loading weather data for ${city}...`;
    weatherInfo.textContent = '';
    currentTemp.textContent = '';
    currentHum.textContent = '';
    
    fetch(url).then(response => {
        response.json().then((data) => {
            
            if(data.error || !city) {
                // locationName.textContent = 'Please provide a valid city name';
                locationName.textContent = data.error;
            } else {
                locationName.textContent = data.city;
                weatherInfo.textContent = `Weather: ${data.weather}`;
                currentTemp.textContent = `Temperature: ${data.temperature}°C`;
                currentHum.textContent = `Humidity: ${data.humidity}%`;
            }
        })
    })
})
