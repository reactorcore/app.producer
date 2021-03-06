var express   = require('express');
var bootable  = require('app-boot');
var app       = require('express')();

var boot      = bootable(app);

function config(app, next) {
  require('./config/config.js')(app);
  next();
};

function auth(app, next) {
  require('./config/auth.js')(app);
  next();
}

function middleware(app, next) {
  require('./config/middleware.js')(app);
  next();
};

// function db(app, next) {};

function routes(app, next) {
  require('./routes.js')(app);
  next();
};

boot.phase(config);
boot.phase(auth);
boot.phase(middleware);
boot.phase(routes);

module.exports = boot;
