var express = require('express');
var router = express.Router();

const strava = require('strava-v3');

const stravaCache = require('./../utils/cache');

/* GET home page. */
router.get('/', async function(req, res, next) { 
  //console.log(req.user);
  let activities = [];
  if(req.user){
    if(!stravaCache.userCacheExists(req.user.id)){
      stravaCache.setUserCache(req.user.id, req.user);
    }
    let page_num = 1;
    //console.log(payload);
    if(stravaCache.userActivitiesCacheExists(req.user.id)){
      activities = stravaCache.getUserActivitiesCache(req.user.id);
    }
    let apiActivities = await strava.athlete.listActivities({access_token: req.user.token, per_page:100});
    //apiActivities  = apiActivities.filter(activity => activity.type == "Run");
    activities = activities.concat(apiActivities);
    console.log(apiActivities.length);

    while(apiActivities.length > 0){
      apiActivities = await strava.athlete.listActivities({access_token: req.user.token, per_page:100, page: page_num++});
      //apiActivities  = apiActivities.filter(activity => activity.type == "Run");
      activities = activities.concat(apiActivities);
      console.log(apiActivities.length);
      console.log(activities.length);
    }
    console.log(activities.length);
    stravaCache.setUserActivitiesCache(req.user.id, activities);
  }
  //console.log(activities);
  res.render('index', { title: 'Strava Maps', user: req.user, activities: activities });
});

module.exports = router;
