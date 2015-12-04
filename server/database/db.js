var dbConfig = require('./dbConfig');
var db = require('levelup')(dbConfig.database);

module.exports = db;