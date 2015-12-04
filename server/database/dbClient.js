var crypto = require('crypto');
var _ = require('underscore');

var createId = function() {
  var currentDate = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  return crypto.createHash('sha1').update(currentDate + random).digest('hex');
};

exports = module.exports = function dbMethods (dbInstance) {
  var dbMethods = {
    _options: {
      'keyEncoding': 'json',
      'valueEncoding': 'json'
    },
    destroy: function (type, id, cb) {
      dbInstance.del(type+'.'+id, dbMethods._options, cb);
    },
    read: function (type, id, cb) {
      dbInstance.get(type+'.'+id, dbMethods._options, cb);
    },
    update: function (type, id, data, cb) {
      dbInstance.put(type+'.'+id, data, dbMethods._options, cb);
    },
    create: function (type, data, cb) {
      var id = createId();
      // TODO: remove adding id
      data.id = id;
      dbInstance.put(type+'.'+id, data, dbMethods._options, cb);
    },

    readAll: function (type, cb) {

      result = [];

      dbInstance.createReadStream()
      .on('data', function(data) {
        // Not all data has a JSON key. Some values might be primitive.
        // But if they are JSON, we need to parse them.
        // TODO: Do we need to parse it? -mdb
        if (isJson(data.value)) {
          data.value = JSON.parse(data.value);
        }
        result.push(data);
      })
      .on('error', function(err) {
        console.log("Error in getAllAsync readstream: ", err);
      })
      .on('end', function() {
        result = _.pluck(result, 'value');
        cb(null, result);
      });
    }

  }

  return dbMethods;
}

var isJson = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false
  }
  return true;
};
