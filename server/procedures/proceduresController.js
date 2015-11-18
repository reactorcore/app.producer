var Procedure = require('./../database/models/procedure.js');
var db = require('./../database');

// NOTE: leveldb put + delete callbacks do not accept a second param for data

module.exports = {
  getProcedures: function(req, res) {
    // TODO: GET ALL PROCEDURES
  },

  createProcedure: function (req, res) {
    var procedureData = req.body;
    var procedureDBModel = new Procedure(procedureData);

    // TODO: remove data param in callback--second arg does not exist in leveldb put method
    db.create('procedure', procedureDBModel, function (err, data) {
      if (err) {
        console.log('Error in createProcedure ', err);
      } else {
        res.status(201);
        res.send(data);
      }
    });
  },

  updateProcedure: function (req, res) {
    // TODO: remove id from model instance
    var procedureId = req.body.id;
    var procedureData = req.body;

    var procedureDBModel = new Procedure(procedureData);

    // TODO: remove data param in callback--second arg does not exist in leveldb put method
    db.update('procedure', procedureId, procedureDBModel, function (err, data) {
      if (err) {
        console.log('Error in updateProcedure ', err);
      } else {
        res.status(201);
        res.send(data);
      }
    });
  },

  getProcedure: function (req, res){
    // TODO: remove id from model instance
    var procedureId = req.body.id;

    db.read('procedure', procedureId, function (err, data) {
      if (err) {
        console.log('Error in getProcedure ', err);
      } else {
        res.status(201);
        res.send(data);        
      }
    });
  },

  deleteProcedure: function (req, res) { 
    var procedureId = req.body.id;

    // TODO: remove data param in callback--second arg does not exist in leveldb put method
    db.destroy('procedure', procedureId, function (err) {
      if (err) {
        console.log('Error in deleteProcedure ', err);
      } else {
        res.status(201);
      }
    });

  }
};