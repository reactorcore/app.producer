var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // The following sets up the routers for user authentication and the templates API
  var router = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use(router); // use templates router for all templates requests

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject router into our routes.js file
  require('../routes.js')(router);

};
