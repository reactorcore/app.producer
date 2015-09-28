var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // The following sets up the routers for user authentication and the templates API
  var userRouter = express.Router();
  var templatesRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/templates', templatesRouter); // use templates router for all templates requests
  app.use('/api/users', userRouter); // use user router for all user requests

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../templates/templatesRoutes.js')(templatesRouter);
};
