module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    // middleware.js
    console.error(error.stack);
    next(error);
  },

  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, {error: error.message});
  },

  getCommitHash: function (req, res) {
    shell.exec("git rev-parse HEAD", { silent: true }, function(error, stdout, stderr) {
      if(error){
        res.send(error);
      } else {
        res.send(stdout);
      }



    });
  }
};
