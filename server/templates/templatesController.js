var asana = require('../asana');

module.exports = {
  // postTemplate will send a template to Asana that has been created by the client 
  // this function expects a req.body with the following properties:
  //        - title, role, event, description
  // It may also be valuable to submit an author with each template
  postTemplate: function (req, res, next) {
    var data = req.body;
    // ***** Send correctly formatted template to Asana *****
    asana.addTask(data.title, data.roleID, data.event, data.procedure);
    res.send("Template Submitted!");
  }
};