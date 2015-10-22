var server = require('./server.js');

server.phase(function listen (app, next) {
  app.listen(process.env.PORT);
  next();
});

server(function onReady (error) {
  if (error) {
    throw error;
  }
});
