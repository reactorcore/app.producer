var express = require('express');

var templatesController = require('./templates/templatesController.js');
var eventsController = require('./events/eventsController');
var rolesController = require('./roles/rolesController.js');

module.exports = function (app) {
  // could be abstracted out into router file
  app.use(express.Router());
  app.use(express.static(__dirname + '/../client'));

  app.post('/templates', templatesController.postTemplate);
  app.get('/roles', rolesController.getRoles);
  app.get('/events', eventsController.getEventsData);
  app.post('/events', eventsController.createEvent);
};
