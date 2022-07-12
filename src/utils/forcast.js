const request = require("request");

const forcast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=21caeff431eaa30ad9c5ee3eadb0efd7&query=" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error.info);
    } else {
      const { weather_descriptions, temperature, feelslike, humidity } =
        body.current;

      callback(
        undefined,
        `${weather_descriptions[0]}.It is currently ${temperature} degress out. It feels like ${feelslike} degress out. The humidity is ${humidity}%`
      );
    }
  });
};

module.exports = forcast;
