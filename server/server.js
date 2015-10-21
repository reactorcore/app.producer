var express = require('express');
var bootable = require('app-boot');
var app = require('express')();

require('./config/config.js');

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app);

// export our app for testing and flexibility, required by index.js

app.listen(8000);

module.exports = app;