var dbConfig = require('./dbConfig.js');
var db = require('./dbCreation.js')(dbConfig);
var dbClient = require('./dbClient.js')(db);
module.exports = dbClient;