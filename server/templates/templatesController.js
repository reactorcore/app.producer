// var asana = require('node-asana');

module.exports = {
  // postTemplate will send a template to Asana that has been created by the client 
  // this function expects a req.body with the following properties:
  //        - role, event, description
  // It may also be valuable to submit an author with each template
  postTemplate: function (req, res, next) {
    console.log("TRIED TO POST A TEMPLATE: ", req.body);
    // ***** Send correctly formatted template to Asana *****
    
    res.send("Template Submitted!");
  }
};