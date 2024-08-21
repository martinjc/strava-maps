var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

const strava = require('strava-v3');
const stravaAuth = require('passport-strava-oauth2').Strategy;
const stravaCredentials = require('./credentials').stravaConfig;

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
const { stravaConfig } = require('./credentials');

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
}); 

passport.use(new stravaAuth({
    clientID: stravaConfig.client_id,
    clientSecret: stravaConfig.client_secret,
    callbackURL: stravaConfig.redirect_uri
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log(accessToken, refreshToken, profile)
      return done(null, profile);
    });
  }
));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: 'no secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error', {error: err});
// });

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = app;
