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


  // login with github route
  app.get('/auth/github', passport.authenticate('github'));

  // github OAuth callback url
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
  });

  app.get('/logout', function (req, res){
    res.cookie('message', 'Logged out.');
    req.logout();
    res.sendStatus(401);
  });



  // 'verify' is authentication middleware added to all protected routes

  app.post('/templates', verify, templatesController.postTemplate);
  app.get('/roles', verify, rolesController.getRoles);
  app.get('/events', verify, eventsController.getEventsData);
  app.post('/events', verify, eventsController.createEvent);
  app.delete('/events/:eventName', verify, eventsController.deleteEvent);
  app.post('/soundboard/:eventName', verify, eventsController.postSoundboard);
  app.get('/soundboard/:eventName', verify, eventsController.getTemplatesFor);
  app.get('/procedures', verify, proceduresController.getProcedures);
  app.post('/procedures', verify, proceduresController.createProcedure);
  app.delete('/procedures/:procedureId', verify, proceduresController.deleteProcedure);

  app.param('eventName', eventsController.getEventName);
  // app.param('procedureName', proceduresController.getProcedureName);

  function verify(req, res, next) {
    if (req.isAuthenticated() && req.user) {
     res.cookie('session', 'true', {httpOnly: false});
     return next();
   }
    if (req.user && req.user.__error) {
      res.cookie('message', req.user.__error);
    } else {
      res.cookie('message', '');
    }
    res.sendStatus(401);
  }

};
