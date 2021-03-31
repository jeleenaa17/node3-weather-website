const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&dt=1586468027&appid=fd5c320761d43b922a16e95fdec79221&units=metric`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.cod == 400) {
            callback('Unable to find location.', undefined);

        } else {
            callback(undefined, `${body.current.weather[0].main}: It is currently ${body.current.temp} degrees out. There is ${body.current.clouds}% chance of clouds. 
            High today is ${body.daily[0].temp.max}, low today is ${body.daily[0].temp.min}`);
        }
    }) 
}

module.exports = forecast;