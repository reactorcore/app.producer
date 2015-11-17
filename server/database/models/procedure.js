var _ = require('underscore');
var Promise = require('bluebird');
var moment = require('moment');
var uuid = require('node-uuid');
var procedureSublevel = require('../db.js').procedureSublevel;

function getNewProcedureId() {
  return uuid.v1();
};

function Procedure(procedureData) {

  var defaultProcedure = {title: '', text: ''};
  procedureData = procedureData || defaultProcedure;
  this.title = procedureData.title;
  this.text = procedureData.text;
  this.DateAdded = procedureData.DateAdded || moment().unix();
  this.ID = procedureData.ID || getNewProcedureId();

};

// Save a new question to the database file and return its id
Procedure.prototype.save = function() {
  var procedure = this;
  return procedureSublevel.putAsync(procedure.ID, procedure)
  .then(function() {
    return procedure.ID;
  });
};

// Get all interview questions
Procedure.prototype.getAllAsync = function() {
  return procedureSublevel.getAllAsync();
}

module.exports = {
  Procedure: Procedure
};