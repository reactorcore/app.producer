//dbCreation.js
var sublevel = require('level-sublevel');
var levelup = require('levelup');
var dbConfig = require('./dbConfig.js');

module.exports = function(dbConfig) {

  // Create main level of database (currently not being used)
  var db = levelup(dbConfig.database, dbConfig.options, function(err, db){
    if (err){
      console.log("Error in levelup: ", err);
    }
  });

  var sub = sublevel(db);
  // Create sublevels of database
  var procedureSublevel = sub.sublevel('procedureSublevel');
  // var interviewQs = sub.sublevel('interviewQs');
  // var faqsDB = sub.sublevel('faqs');
  // var feedback = sub.sublevel('feedback');
  return {
    db: db,
    sub: sub,
    procedureSublevel: procedureSublevel
    // interviewQs: interviewQs,
    // faqsDB: faqsDB,
    // feedback: feedback
  };
};