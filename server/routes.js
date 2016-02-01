var express = require('express');
var passport = require('passport');
var helpers = require('./config/helpers.js');

var templatesController = require('./templates/templatesController.js');
var eventsController = require('./events/eventsController');
var rolesController = require('./roles/rolesController.js');
var proceduresController = require('./procedures/proceduresController.js');
var soundboardController = require('./soundboard/soundboardController.js');
var permissionsController = require('./permissions/permissionsController.js');

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
      res.cookie('session', 'true', { httpOnly: false });
      res.redirect('/');
  });


  app.get('/logout', function (req, res){
    req.logout();
    res.cookie('session', '');
    res.sendStatus(401);
  });



  // 'verify' is authentication middleware added to all protected routes

  app.post('/templates', helpers.verify, templatesController.postTemplate);
  app.get('/roles', helpers.verify, rolesController.getRoles);
  app.get('/events', helpers.verify, eventsController.getEventsData);
  app.post('/events', helpers.verify, eventsController.createEvent);
  app.delete('/events/:eventName', helpers.verify, eventsController.deleteEvent);
  app.post('/soundboard/:eventName', helpers.verify, helpers.authorize, soundboardController.postSoundboard);
  app.get('/soundboard/:eventName', helpers.verify, helpers.authorize, soundboardController.getSoundboardTemplate);
  app.get('/procedures', helpers.verify, proceduresController.getProcedures);
  app.post('/procedures', helpers.verify, proceduresController.createProcedure);
  app.put('/procedures/:procedureId', helpers.verify, proceduresController.updateProcedure);
  app.delete('/procedures/:procedureId', helpers.verify, proceduresController.deleteProcedure);
  app.get('/permissions', helpers.verify, permissionsController.getPermissions);

  app.get('/commit', helpers.getCommitHash);

};
