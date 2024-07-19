var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  passport.authenticate('strava', { scope: ['public'] });
});

router.get('/strava/callback', passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
