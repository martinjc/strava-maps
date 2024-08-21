var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) { 
  console.log(req.user);
  res.render('index', { title: 'Strava Maps', user: req.user });
});

module.exports = router;
