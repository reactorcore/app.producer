var templatesController = require('./templates/templatesController.js');
var eventsController = require('./templates/eventsController');

module.exports = function (app) {
  if(templatesController){ 
    console.log("FOUND TEMPLATES CONTROLER"); 
  }
  app.post('/templates', templatesController.postTemplate);
  app.get('/events', eventsController.getEventsList);
};
