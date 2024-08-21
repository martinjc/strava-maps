var express = require('express');
var router = express.Router();
var passport = require('passport');

const stravaAuth = require('passport-strava-oauth2').Strategy;
const strava = require('strava-v3');
const stravaConfig = require('./../credentials').stravaConfig;

passport.use(new stravaAuth({
  clientID: stravaConfig.client_id,
  clientSecret: stravaConfig.client_secret,
  callbackURL: stravaConfig.redirect_uri
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    return done(null, profile);
  });
}
));

/* GET home page. */
router.get('/', passport.authenticate('strava', {scope: ['activity:read_all,profile:read_all']}), function(req, res) {
});

router.get('/callback',
  passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user);
    res.redirect('../');
});

router.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('../');
});

module.exports = router;