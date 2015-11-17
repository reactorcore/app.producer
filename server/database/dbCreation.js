var levelup = require('levelup');

exports = module.exports = function(dbConfig) {
  var db = levelup(dbConfig.database, dbConfig.options, function(err, db){
    if (err){
      console.log("Error in levelup: ", err);
    }
  });

  return db;
};