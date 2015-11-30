var express = require('express');
var passport = require('passport');

var templatesController = require('./templates/templatesController.js');
var eventsController = require('./events/eventsController');
var rolesController = require('./roles/rolesController.js');
var proceduresController = require('./procedures/proceduresController.js');

module.exports = function (app) {
  // could be abstracted out into router file
  app.use(express.Router());
  app.use(express.static(__dirname + '/../client'));

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
  });

  app.get('/logout', function (req, res){
    res.cookie('message', 'Logged out.');
    req.logout();
    res.redirect('/login');
  });

  app.post('/templates', templatesController.postTemplate);
  app.get('/roles', rolesController.getRoles);
  app.get('/events', eventsController.getEventsData);
  app.post('/events', eventsController.createEvent);
  app.post('/signal/:eventName', eventsController.postSignal);
  app.delete('/events/:eventName', eventsController.deleteEvent);
  app.get('/procedures', proceduresController.getProcedures);
  app.post('/procedures', proceduresController.createProcedure);
  app.delete('/procedures/:procedureId', proceduresController.deleteProcedure);

  app.param('eventName', eventsController.getEventName);
  // app.param('procedureName', proceduresController.getProcedureName);

  function verify(req, res, next) {
    if (req.isAuthenticated() && req.user) {
     res.cookie('message', '');
     return next();
   }
    if (req.user && req.user.__error) {
      res.cookie('message', req.user.__error);
    } else {
      res.cookie('message', '');
    }
    res.redirect('/login');
  }

};
