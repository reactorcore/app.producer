var path = require('path');
var db = '';

if (process.env.NODE_ENV === 'production') {
  db = './data/production';
} else if (process.env.NODE_ENV === 'staging') {
  db = './data/staging';
} else {
  db = './data/development'
}

console.log("Using database: " + path.join(__dirname, db));

module.exports = {
  database: path.join(__dirname, db),
  options: {
    valueEncoding: 'json'
  }
}

