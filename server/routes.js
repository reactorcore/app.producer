var templatesController = require('./templates/templatesController.js');

module.exports = function (app) {
  if(templatesController){ 
    console.log("FOUND TEMPLATES CONTROLER"); 
  }
  app.post('/templates', templatesController.postTemplate);
};
