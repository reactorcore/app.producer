var bodyParser = require('body-parser');
var session = require('express-session');
var GitHubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var cookieParser = require('cookie-parser');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:8000/auth/github/callback',
    scope: ['read:org', 'user']
  },

  function(accessToken, refreshToken, profile, done) {

    require('request').get({
      json: true,
      url: 'https://api.github.com/user/teams',
      headers: {
                'Authorization': 'token ' + accessToken,
                // this needs to be changed
                // should this be 'Hack Reactor'?
                'User-Agent': process.env.USER_AGENT
              }
      },
    function(err, res, body){
      var authorized = false;
      body.forEach(function(ea) {
        if (ea.slug === process.env.TEAM_NAME && ea.organization.login === process.env.ORG_NAME) {
          authorized = true;
        }
      });
      profile.__authorized = authorized;
      if (!authorized) {
        profile.__error = 'No permission to access this content.';
      }
      done(null, profile);
    });
  }
));

exports = module.exports = function (app) {

  // initializes passport middleware
  app.use(cookieParser());
  app.use(session({ secret: 'nsa nsa nsa usa usa' }));
  app.use(passport.initialize());
  app.use(passport.session());

};
