var express = require('express');
var router = express.Router();

const strava = require('strava-v3');

/* GET home page. */
router.get('/', async function(req, res, next) { 
  res.render('index', { title: 'Strava Maps', user: req.user });
});

module.exports = router;
