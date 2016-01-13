var request = require('request');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json",
  "secret": process.env.CHOREOGRAPHER_SECRET
};

module.exports =  {

  postSoundboard: function (req, res, next) {
    // This is the format for timezone:
    // var timezone = 'America/Los Angeles';
    var eventName = req.params.eventName;
    request({
      method: 'POST',
      uri: process.env.CHOREOGRAPHER_URL + '/signal/' + eventName,
      headers: headers
    }, function (error, response, body) {
      if (error) {
        console.log('postSoundboard error: ', error);
        res.send(400);
      } else {
        res.send(200);
      }
    });
  },

  getSoundboardTemplate: function (req, res, next) {
    var eventName = req.params.eventName;
    request({
      method: 'GET',
      uri: process.env.CHOREOGRAPHER_URL +  '/events/' + eventName + '/templates',
      headers: headers
    }, function (error, response, body) {
      if(error) {
        console.log('get Soundboard events error: ', error);
        res.send(400);
      } else {
        res.status(200).send(body);
      }
    });
  }
};
