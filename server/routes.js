var templatesController = require('./templates/templatesController.js');
var eventsController = require('./events/eventsController');
var rolesController = require('./roles/rolesController.js');

module.exports = function (app) {
  app.post('/templates', templatesController.postTemplate);
  app.get('/roles', rolesController.getRoles);
  app.get('/events', eventsController.getEventsList);
};
