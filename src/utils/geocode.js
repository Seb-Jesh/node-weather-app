const request = require('postman-request');

const access_token = 'pk.eyJ1IjoiamVzaHVydW4iLCJhIjoiY2w1bXdxNmlyMDNsZTNib2VraXJ1cDZkNyJ9.AjRt2JYN5F1w9TcLIB0T9g';

const geocode = (city, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${access_token}&limit=1`;

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect. Check your network settings.', undefined);
        } else if(body.features.length === 0) {
            callback('Please provide a valid name of a city.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;