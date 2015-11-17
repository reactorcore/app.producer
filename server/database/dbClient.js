var crypto = require('crypto');

var createId = function() {
  var currentDate = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  return crypto.createHash('sha1').update(currentDate + random).digest('hex');
};

exports = module.exports = function dbClient (dbInstance) {
  var dbClient = {
    _options: {
      'keyEncoding': 'json',
      'valueEncoding': 'json'
    },
    destroy: function (type, id, cb) {
      dbInstance.del(type+'.'+id, dbClient._options, cb);
    },
    read: function (type, id, cb) {
      dbInstance.get(type+'.'+id, dbClient._options, cb);
    },
    update: function (type, id, data, cb) {
      dbInstance.put(type+'.'+id, data, dbClient._options, cb);
    },
    create: function (type, data, cb) {
      var id = createId();
      data.id = id;
      dbInstance.put(type+'.'+id, data, dbClient._options, cb);
    }

  }

  return dbClient;
}