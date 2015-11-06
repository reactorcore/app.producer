var fs = require('fs');

var readProcedures = function(callback){
  
  //Temporary hack
  //TODO: deprecate
  var testProcedures = [
    {title: "Test 1", text: "My description 1"},
    {title: "Test 2", text: "My description 2"},
    {title: "Test 3", text: "My description 3"},
    {title: "Test 4", text: "My description 4"},
    {title: "Test 5", text: "My description 5"},
    {title: "Test 6", text: "My description 6"},
    {title: "Test 7", text: "My description 7"}
  ];
  // endhack

  // fs.readFile('procedures.txt', function(err, data){
  //   if(err) {
  //     console.log("could not read from file");
  //     callback(503);
  //   } else {
  //     data = JSON.parse(data.toString());
  //     callback(data);
  //   }
  // })
  callback(testProcedures);

}

var writeProcedures = function(procedures, callback){
  // var stringifiedProcedures = JSON.stringify(procedures);
  // fs.writeFile('procedures.txt', stringifiedProcedures, function(err){
  //   if(err) {
  //     console.log("could not write to file");
  //     callback(503);
  //   } else {
  //     callback(200);
  //   }
  // })
  callback(200);
}


module.exports = {
  getProcedures: function(req, res, next) {
    readProcedures(function(data){
      res.send(data);
    })
  },

  createProcedure: function(req, res, next) {
    var newProcedure = req.body;

    //TODO!!!


    // readProcedures(function(procedures){
    //   if(procedures){
    //     procedures.push(newProcedure);
    //   } else {
    //     procedures = [newProcedure];
    //   }
    //   writeProcedures(procedures, function(status){
    //     res.sendStatus(status);
    //   });
    // });
  },


  getProcedureName: function(req, res, next, name){
    req.procedureName = name;
    next()
  },

  deleteProcedure: function(req, res, next) { 
    var procedureName = req.procedureName;

  }
};