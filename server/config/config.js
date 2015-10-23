var fs = require('fs');

module.exports = function() {
  // console.log('looking for file')
  // console.log('current directory: ', __dirname)
  // fs.stat(__dirname + '/../../.env', function(err, stat){
  //   if(!err) {
  //     console.log('File exists!');
  //     require('dotenv').load();
  //   } else {
  //     console.log('File doesnt exist!');
  //   }
  // });
  // try {
  //   var env = fs.lstatSync(__dirname + '/../../.env');
  //   if (env.isFile()){
  //     console.log('ENV FOUND');
  //     require('dotenv').load();
  //   }
  // }
  // catch (error) {
  //   console.log(error);
  // }
  require('dotenv').load();
};