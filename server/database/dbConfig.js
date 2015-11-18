var path = require('path');

var env = process.env.NODE_ENV || 'development';
var dbPath = './data/' + env;

console.log("Using database: " + path.join(__dirname, dbPath));

var database = path.join(__dirname, dbPath);

module.exports = exports = database;

