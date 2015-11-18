var path = require('path');
var env = process.env.NODE_ENV || 'development';

var dbPath = path.join(__dirname, './data/', env);
console.log("Using database: ", dbPath);

module.exports = exports = {
  database: dbPath
};

