var path = require('path');

var env = process.env.NODE_ENV || 'development';
var db = './data/' + env;

console.log("Using database: " + path.join(__dirname, db));

module.exports = {
  database: path.join(__dirname, db)
}

