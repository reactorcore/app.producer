var fs = require('fs');

module.exports = function() {
  // This function synchronously checks to see if .env is available. 
  // If available, it loads the dotenv npm module, giving global access
  // to process.env variables. If not available, it short circuits the 
  // dotenv module.
  try {
    var env = fs.lstatSync(__dirname + '/../../.env');
    if (env.isFile()){
      console.log('ENV FOUND');
      require('dotenv').load();
    }
  }
  catch (error) {
    console.log(error);
  }
};