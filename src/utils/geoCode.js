const request = require("request");

const geoCode = (address, callBack) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=dfffc5e027bec4966ed2d805e82de7a9&query=" +
    encodeURIComponent(address);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack("Unable to connect to location services!", undefined); //bydefault second parameter would be undefined if we would pass anything
    } else if (body.error) {
      callBack(body.error.message, undefined);
    } else {
      const { latitude, longitude, label } = body.data[0];

      callBack(undefined, {
        latitude,
        longitude,
        label,
      });
    }
  });
};

module.exports = geoCode;
