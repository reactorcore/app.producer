var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');
var Papa = require('babyparse');
var path = require('path');
var feedback = require('../db.js').feedback;
// uuid generates RFC41222 valid unique identifiers
// This is better for scaling NoSQL databases.
// Not relevant for LevelDB but imagine trying to keep track
// of an auto-incrementing unique ID across databases
// spread across multiple systems.
var uuid = require('node-uuid');

function Feedback(feedbackData) {
    // set default
    var defaultFeedback = { Email: '', Text: ''};
    feedbackData = feedbackData || defaultFeedback;

    // add user-input data
    this.Email = feedbackData.Email;
    this.Text = feedbackData.Text;
    this.DateAdded = moment().unix();
    this.ID = feedbackData.ID || uuid.v1();
};

Feedback.prototype.save = function() {
  var newFeedback = this;
  return feedback.putAsync(newFeedback.ID, newFeedback)
  .then(function(result) {
  })
  .catch(function(err) {
    console.error(new Error(err).stack);
  });
};

Feedback.prototype.getAllAsync = function() {
  return feedback.getAllAsync();
};

module.exports = Feedback;
