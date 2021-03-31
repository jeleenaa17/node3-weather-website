const request = require('request');

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiamVsZWVuYWExNyIsImEiOiJja21xYWExZnMweG80MnBydnN4aWNsaGRkIn0.iBQEKD69PCd4_5zobm3kNg`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
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