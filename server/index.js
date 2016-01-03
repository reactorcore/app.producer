var server = require('./server.js');
var shell = require('child_process');

function getLatestCommit() {
    shell.exec("git rev-parse HEAD", { silent: true }, function(error, stdout, stderr) {
        console.log("GIT SHIT: ", error, stdout);
    });
}
getLatestCommit();

server.phase(function listen (app, next) {
  console.log("I'm in the server phase!");
  app.listen(process.env.PORT);
  next();
});

server(function onReady (error) {
  if (error) {
    throw error;
  }
});
