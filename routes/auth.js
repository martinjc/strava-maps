var express = require('express');
var router = express.Router();

const strava = require('strava-v3');
const credentials = require('./../credentials');

strava.config(credentials.stravaConfig);

/* GET home page. */
router.get('/', async function(req, res) {
    // if query has code parameter, we're in the middle of oauth
    if(req.query.code) {
        let payload = await strava.oauth.getToken(req.query.code);
        let creds = credentials.stravaConfig;
        creds.access_token = payload.access_token;
        console.log(creds);
        s = new strava.client(payload.access_token);
        console.log(s);
        payload = await s.athlete.get({})
        console.log(payload);
        console.log('done');
    } 
  res.render('index', { title: 'Express' });
});

module.exports = router;