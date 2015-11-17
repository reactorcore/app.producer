
module.exports = function(winston, cloudwatch) {
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({
        name: 'info',
        filename: 'server/node.info.log',
        level: 'info'
      }),
      new (winston.transports.File)({
        name: 'error',
        filename: 'server/node.error.log',
        level: 'error'
      })
    ]
  });

  if (process.env.AWS_KEY && process.env.AWS_SECRETKEY) {
    var options = {
      logGroupName: 'app.producer',
      logStreamName: 'logs-' + (process.env.NODE_ENV || 'development'),
      awsConfig: { 
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRETKEY,
        region: 'us-west-2'
      }
    }

    logger.add(require('winston-aws-cloudwatch'), options)
    logger.info('Streaming to CloudWatch log stream: ' + options.logStreamName)
  }

  return logger;
};
