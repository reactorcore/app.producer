var crypto = require('crypto');

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
    }

  }

  return dbMethods;
}