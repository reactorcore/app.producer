var fs = require('fs');

module.exports = function() {
  console.log('looking for file')
  console.log('current directory: ', __dirname)
  fs.statSync(__dirname + '/../../.env', function(err, stat){
    if(!err) {
      console.log('File exists + I am currently in');
      require('dotenv').load();
    } else {
      console.log('File doesnt exist!');
    }
  });
  // try {
  //   var env = fs.lstatSync('/../../.env');
  //   if (env.isFile()){
  //     console.log('ENV FOUND');
  //     require('dotenv').load();
  //   }
  // }
  // catch (error) {
  //   console.log(error);
  // }
};