var express = require('express');

var templatesController = require('./templates/templatesController.js');
var eventsController = require('./events/eventsController');
var rolesController = require('./roles/rolesController.js');
var proceduresController = require('./procedures/proceduresController.js');

module.exports = function (app) {
  // could be abstracted out into router file
  app.use(express.Router());
  app.use(express.static(__dirname + '/../client'));

  app.post('/templates', templatesController.postTemplate);
  app.get('/roles', rolesController.getRoles);
  app.get('/events', eventsController.getEventsData);
  app.post('/events', eventsController.createEvent);
  app.put('/events/:eventName', eventsController.putEvent);
  app.delete('/events/:eventName', eventsController.deleteEvent);
  app.get('/procedures', proceduresController.getProcedures);
  app.post('/procedures', proceduresController.createProcedure);
  app.delete('/procedures/:procedureName', proceduresController.deleteProcedure);

  app.param('eventName', eventsController.getEventName);
  app.param('procedureName', proceduresController.getProcedureName);

};
