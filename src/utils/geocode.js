const request = require("request");
const chalk = require("chalk");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FyeTEiLCJhIjoiY2s0OTNpNXkwMDE3bTNzcDhwbXEwbG4zdyJ9.rupWDTRcNkR3CwUPnr_klQ&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Cannot fetch location data!", undefined);
    } else if (body.message) {
      callback("Location body error!", undefined);
    } else if (!body.features.length) {
      callback("No features found", undefined);
    } else {
      const city = body.features[0].place_name;
      const lat = body.features[0].center[0];
      const long = body.features[0].center[1];
      callback(undefined, { lat, long, city });
    }
  });
};

module.exports = geocode;
