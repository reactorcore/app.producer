var dbClient = require('./../db/db.js');
var Procedure = require('./../db/models/procedure.js').Procedure;
// var InterviewQuestion = require('./../db/models/question.js').InterviewQuestion;
// var FaqQuestion = require('./../db/models/faq.js').FaqQuestion;
// var Feedback = require('./../db/models/feedback.js');

// These three data types correspond to the following models
var dataTypes = {
  'procedure': Procedure,
};

var dbSublevels = {
  'procedure': 'procedureSublevel'
  // 'faq': 'faqsDB',
  // 'feedback': 'feedback',
  // 'questions': 'interviewQs'
};

function getAll(req, res) {
  var type = req.params.type;
  var instance = new dataTypes[type]();

  instance.getAllAsync()
  .then(function(data) {
    res.status(200);
    res.send({data: data});
  })
  .catch(function(err) {
    console.error(new Error(err).stack);
    res.sendStatus(500);
  });
}

function getById(req, res) {
  var type = req.params.type;

  new dataTypes[type]().getById(req.params.id)
  .then(function(value) {
    res.send(value);
  });
}

function add(req, res) {
  var type = req.params.type;
  var data = req.body;
  var instance = new dataTypes[type](data);

  instance.save()
  .then(function(newID) {
    data.ID = newID;
    res.status(201);
    res.send(data);
  })
  .catch(function(err) {
    console.error(new Error(err).stack);
    res.sendStatus(500);
  });
}

function update(req, res) {
  var type = req.params.type;
  var data = req.body;
  var instance = new dataTypes[type](data);

  instance.save()
  .then(function() {
    res.status(201);
    res.send(data);
  })
  .catch(function(err) {
    console.error(new Error(err).stack);
    res.sendStatus(500);
  });
}

function remove(req, res) {

  var type = req.params.type;
  var instance = new questionTypes[type]();

  dbClient[dbSublevels[type]].delAsync(req.params.id)
  .then(function(value) {
    res.sendStatus(204);
  })
  .catch(function(err) {
    res.sendStatus(404);
  });
}

module.exports = {
  getAll: getAll,
  getById: getById,
  add: add,
  update: update,
  remove: remove
};