var asana = require('../asana/asana');

module.exports = {
  // getRoles will query Asana for a list of possible roles 
  // to be used for autocomplete on the client side
  getRoles: function (req, res, next) {
    console.log("GETTING ROLES");
    asana.getRoles(function(roles){
      res.send(roles);
    });
  }
};