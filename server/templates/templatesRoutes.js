var templatesController = require('./templatesController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js
  
  app.post('/postTemplate', templatesController.postTemplate);
};
