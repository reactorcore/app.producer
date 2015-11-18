var moment = require('moment');

exports = module.exports = function Procedure(procedureData) {
  var defaultProcedure = {title: '', text: ''};
  procedureData = procedureData || defaultProcedure;
  this.title = procedureData.title;
  this.text = procedureData.text;
  this.DateAdded = procedureData.DateAdded || moment().unix();
  // TODO: remove id from Procedure instance
  this.id = procedureData.id || '';
};