var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  helmet = require('helmet');

var session = require('express-session')

var passport = require('passport'); // Passport: Node's Middleware for users login
// passport configuration
require('./app/models/user');
require('./passport')(passport);

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

app.use(helmet());

// use sessions
app.use(session({ secret: 'lollllo', cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 } }));

// Passport config
app.use(passport.initialize());
app.use(passport.session());

// Passport routes
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Twitter login
app.get('/auth/twitter', passport.authenticate('twitter'));

// Callback after Twitter login
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/' }
));

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});