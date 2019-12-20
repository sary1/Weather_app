const request = require("request");
const chalk = require("chalk");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/668b932b2b38d9f374d10d131ad465a3/${lat},${long}?units=si`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Cannot fetch weather data!", undefined);
    } else if (body.error) {
      console.log("Weather body error", undefined);
    } else {
      const exp = `Weather is: ${body.hourly.data[0].summary}. \nIt is currently ${body.currently.temperature} degrees out. \nThere is ${body.currently.precipProbability}% chance of rain. Humidity is: ${body.currently.humidity}`;
      callback(undefined, exp);
    }
  });
};

module.exports = forecast;
