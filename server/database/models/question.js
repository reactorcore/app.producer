var _ = require('underscore');
var Promise = require('bluebird');
var moment = require('moment');
var uuid = require('node-uuid');
var interviewQs = require('../db.js').interviewQs;

// Retuns a unique UUID which is determined by the computer ID and the current time
function getNewInterviewQId() {
  return uuid.v1();
};

// TODO: record github handle

// Interview Question for database storage or retrieval of all questions
// Title, question and at least one category are required for submitted questions (enforced on client)
// Currently accepts multiple categories but only one company and one position (enforced on server)
function InterviewQuestion(questionData) {
  var defaultQuestion = { Title: '', Question: '', categories: [] };
  questionData = questionData || defaultQuestion;

  this.Title = questionData.Title;
  this.Question = questionData.Question;
  this.Category = _.pluck(questionData.Categories, 'text');
  this.Company = [];
  this.Position = [];
  this.DateAdded = questionData.DateAdded || moment().unix();

  this.ID = questionData.ID || getNewInterviewQId();

  if (questionData.Company) {
    var companies = _.pluck(questionData.Company, 'text');
    this.Company.push(_.first(companies));
  }
  if (questionData.Position) {
    var positions = _.pluck(questionData.Position, 'text');
    this.Position.push(_.first(positions));
  }

};

// Save a new question to the database file and return its id
InterviewQuestion.prototype.save = function() {
  var question = this;
  return interviewQs.putAsync(question.ID, question)
  .then(function() {
    return question.ID;
  });
};

// Get all interview questions
InterviewQuestion.prototype.getAllAsync = function() {
  return interviewQs.getAllAsync();
}

module.exports = {
  InterviewQuestion: InterviewQuestion,
};
