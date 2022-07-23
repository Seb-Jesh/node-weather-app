const request = require('postman-request');

const access_key = 'bdc6c0c77663d72436a3abd48a5a630e'

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${lat},${lon}`;

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect. Check your network settings.', undefined);
        } else if(body.success === false) {
            callback(body.error.info);
        } else {
            callback(undefined, {
                city: body.location.name,
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast;