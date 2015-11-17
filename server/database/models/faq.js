var _ = require('underscore');
var Promise = require('bluebird');
var moment = require('moment');
var uuid = require('node-uuid');
var faqsDB = require('../db.js').faqsDB;


// TODO: record github handle

// Interview Question for database storage or retrieval of all questions
// Title, question and at least one category are required for submitted questions (enforced on client)
// Currently accepts multiple categories but only one company and one position (enforced on server)
function FaqQuestion(questionData) {
  var defaultQuestion = { Title: '', Question: '', categories: [] };
  questionData = questionData || defaultQuestion;

  this.Title = questionData.Title;
  this.Question = questionData.Question;
  this.Category = _.pluck(questionData.Categories, 'text');

  // TODO: don't update date when saving
  this.DateAdded = moment().unix();
  this.ID = questionData.ID = questionData.ID || uuid.v1();

  if (questionData.Answer) {
    this.Answer = questionData.Answer;
  }

};

// Save a new question to the database file and return its id
FaqQuestion.prototype.save = function() {
  var faq = this;
  return faqsDB.putAsync(faq.ID, this)
  .then(function() {
    return faq.ID;
  });
};

// Get all interview questions
FaqQuestion.prototype.getAllAsync = function() {
  return faqsDB.getAllAsync();
};

FaqQuestion.prototype.getById = function(id) {
  return faqsDB.getAsync(id);
};

FaqQuestion.prototype.delAsync = function(id) {
  return faqsDB.delAsync(id);
};

module.exports = {
  FaqQuestion: FaqQuestion,
};
