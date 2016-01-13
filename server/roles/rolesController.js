var asana = require('../asana');
var request = require('request');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json",
  "secret": process.env.CHOREOGRAPHER_SECRET
};

module.exports = {
  // getRoles will query Asana for a list of possible roles
  // to be used for autocomplete on the client side
  getRoles: function (req, res, next) {
    console.log("GETTING ROLES");
    request({
      method: 'GET',
      uri: process.env.CHOREOGRAPHER_URL +  '/roles',
      headers: headers,
    }, function (error, response, body) {
      if (error) {
        console.log("Error: ", error);
        res.send(error);
      } else {
        res.status(response.statusCode).send(response.body);
      }
    });

    // asana.getRoles(function(roles){
    //   res.send(roles);
    // });
  }
};
