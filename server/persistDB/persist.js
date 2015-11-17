// var winston = require('winston');
// var logger = require('../logging/winstonSetup')(winston);
var fs = require('fs');
var path = require('path');
var s3 = require('s3');
var bucket = process.env.S3_BUCKET;
var client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
});

var persist = {
  watchDir: function(dirPath) {
    var realPath = dirPath + '/' + (process.env.NODE_ENV || 'development')
    console.log(realPath)
    // logger.info("Watching directory " + realPath + " for changes.");
    fs.watch(realPath, function (e, filename) {
      if (e === 'change') {
        console.log('changed:', filename);
        persist.updateFile(path.resolve(realPath + '/' + filename));
      }
    });
  },
  updateFile: function (filePath, done) {
    if (done == null) {
      done = function noop (){}
    }
    var params = {
      localFile: filePath,
      s3Params: {
        Bucket: bucket,
        Key: ['data', (process.env.NODE_ENV || 'development'), path.basename(filePath)].join('/')
      },
    };

    console.log("Updating and uploading with params = " + JSON.stringify(params));

    var uploader = client.uploadFile(params);
    uploader.on('error', function(err) {
      console.error('unable to upload:', err.stack);
      done(err);
      done = function noop (){};
    });
    uploader.on('end', function() {
      console.log('done uploading');
      done();
    });
  }, 
  retrieveDir: function (dirPath, done) {
    if (done == null) {
      done = function noop (){}
    }
    var params = {
      localDir: [dirPath, (process.env.NODE_ENV || 'development')].join('/'),
      s3Params: {
        Bucket: bucket,
        Prefix: ['data', (process.env.NODE_ENV || 'development')].join('/')
      },
    };

    console.log("Retrieving directory with params = " + JSON.stringify(params));
    
    var downloader = client.downloadDir(params);
    downloader.on('error', function(err) {
      console.error('unable to download:', err.stack);
      logger.error('unable to download:', err.stack);
      done(err);
      done = function noop (){};
    });
    downloader.on('end', function() {
      console.log('done downloading');
      logger.info('done downloading');
      done();
    });
  }
}


module.exports = exports = persist;