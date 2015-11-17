var Promise = require('bluebird');
var _ = require('underscore');
module.exports = function(db) {

  // Promisified version of put
  db.putAsync = function(key, value, options) {
    var dbLevel = this;
    return new Promise(function(resolve, reject) {
      dbLevel.put(key, value, options, function(err) {
        if (err) reject(err)
        else resolve(value);
      });
    });
  };

  // Promisifed version of get
  db.getAsync = function(key, options) {
    var dbLevel = this;
    return new Promise(function(resolve, reject) {
      dbLevel.get(key, options, function(err, value) {
        if (err) reject(err);
        else resolve(value);
      });
    });
  };

  // Promisified version of batch (array version)
  db.batchArrayAsync = function(array, options) {
    var dbLevel = this;
    return new Promise(function(resolve, reject) {
      dbLevel.batch(array, options, function(err) {
        if (err) reject(err);
        else resolve()
      });
    });
  };

  // Promisified version of del
  db.delAsync = function(key, options) {
    var dbLevel = this;
    return new Promise(function(resolve, reject) {
      dbLevel.del(key, options, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  // leveldb does not have a 'getAll' function or 'SELECT *'
  // type function. Here we mimic it by using the read stream.
  db.getAllAsync = function() {
    var dbLevel = this;
    result = [];
    return new Promise(function(resolve, reject) {
      dbLevel.createReadStream()
      .on('data', function(data) {
        // Not all data has a JSON key. Some values might be primitive.
        // But if they are JSON, we need to parse them.
        if (isJson(data.value)) {
          data.value = JSON.parse(data.value);
        }
        result.push(data);
      })
      .on('error', function(err) {
        console.log("Error in getAllAsync readstream: ", err);
        reject(err);
      })
      .on('end', function() {
        result = _.pluck(result, 'value');
        result = result.sort(function(a, b) {
          // This handles cases where we have no DateAdded key
          if (a.DateAdded & b.DateAdded) {
            return a.DateAdded - b.DateAdded;
          } else {
            return 0;
          }
        });
        resolve(result);
      });
    });
  };

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false
    }
    return true;
  };

  // Extend promisified versions of put/get/batch/del to sublevels
  var db = _.defaults(db.db, db);
  var procedureSublevel = _.defaults(db.procedureSublevel, db);

  // var interviewQs = _.defaults(db.interviewQs, db);
  // var faqsDB = _.defaults(db.faqsDB, db);
  // var feedback = _.defaults(db.feedback, db);

  return {
    db: db,
    sub: db.sub,
    procedureSublevel: procedureSublevel
    // interviewQs: interviewQs,
    // faqsDB: faqsDB,
    // feedback: feedback
  };
};
