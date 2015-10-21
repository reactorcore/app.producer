var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app) {
  // The following sets up the routers for user authentication and the templates API

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  require('../routes.js')(app);
};
