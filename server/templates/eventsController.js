var request = require('request');

module.exports = {
  getEventsList: function(req, res, next) {
    request({
      method: 'GET',
      uri: 'http://api.hackreactor.com/choreographer/v0/metronome/events/',
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "content-type, accept",
        "access-control-max-age": 10, // Seconds.
        "Content-Type": "application/json"
      }
    }, function(error, response, body) {
      // res.send(body);
      console.log(body);
      var parsedData = JSON.parse(body);
      var abbreviations = {
        M:'Monday',
        T:'Tuesday',
        W:'Wednesday',
        R:'Thursday',
        F:'Friday',
        S:'Saturday'
      };
      // rename these variables
      var events = parsedData.active.map(function(event) {
        return {
          "abbreviation": event,
          "text": abbreviations[event]
        };
      });
      res.send(events);
    });
  }
};