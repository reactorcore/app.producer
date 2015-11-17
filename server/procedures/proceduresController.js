var Procedure = require('./../database/models/procedure.js').Procedure;

module.exports = {
  getProcedures: function(req, res, next) {
    var procedureDBModel = new Procedure();

    procedureDBModel.getAllAsync()
    .then(function(procedures) {
      res.status(200);
      res.send(procedures);
    })
    .catch(function(err) {
      console.error(new Error(err).stack);
      res.sendStatus(500);
    });
  },

  createProcedure: function(req, res, next) {
    var procedureData = req.body;
    var procedureDBModel = new Procedure(procedureData);

    procedureDBModel.save()
    .then(function(newID) {
      procedureData.ID = newID;
      res.status(201);
      res.send(procedureData);
    })
    .catch(function(err) {
      console.error(new Error(err).stack);
      res.sendStatus(500);
    });
  },

  getProcedureName: function(req, res, next, name){
    req.procedureName = name;
    next()
  },

  deleteProcedure: function(req, res, next) { 
    var procedureName = req.procedureName;

  }
};