//dbConfig.js
// Embedded database directory for levelDB
// var winston = require('winston');
// var logger = require('../logging/winstonSetup')(winston);
var path = require('path');
var db = '';

if (process.env.NODE_ENV === 'production') {
  db = './data/production';
} else if (process.env.NODE_ENV === 'staging') {
  db = './data/staging';
} else {
  db = './data/development'
}

// logger.info("Using database: " + path.join(__dirname, db));
console.log("Using database: " + path.join(__dirname, db));

module.exports = {
  database: path.join(__dirname, db),
  options: {
    valueEncoding: 'json'
  }
}

