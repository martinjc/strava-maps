const fs = require('fs');

const cache = 'cache';

userCacheExists = (userId) => {
  return fs.existsSync(`${cache}/${userId}/user.json`);
};

getUserCache = (userId) => {
    if (!userCacheExists(userId)) {
        return null;
    }
  return JSON.parse(fs.readFileSync(`${cache}/${userId}/user.json`));
};

setUserCache = (userId, user) => {
    if(!fs.existsSync(`${cache}/${userId}`)){
        fs.mkdirSync(`${cache}/${userId}`);
    }
  fs.writeFileSync(`${cache}/${userId}/user.json`, JSON.stringify(user));
};

userActivitiesCacheExists = (userId) => {
  return fs.existsSync(`${cache}/${userId}/activities.json`);
};

getUserActivitiesCache = (userId) => {
    if (!userActivitiesCacheExists(userId)) {
        return null;
    }
  return JSON.parse(fs.readFileSync(`${cache}/${userId}/activities.json`));
};

setUserActivitiesCache = (userId, activities) => {
    if(!fs.existsSync(`${cache}/${userId}`)){
        fs.mkdirSync(`${cache}/${userId}`);
    }
  fs.writeFileSync(`${cache}/${userId}/activities.json`, JSON.stringify(activities));
};

userActivityCacheExists = (userId, activityId) => {
  return fs.existsSync(`${cache}/${userId}/activity/${activityId}.json`);
};

getUserActivityCache = (userId, activityId) => {
    if(!userActivityCacheExists(userId, activityId)){
        return null;
    }
  return JSON.parse(fs.readFileSync(`${cache}/${userId}/activity/${activityId}.json`));
};

setUserActivityCache = (userId, activityId, activity) => {
    if(!fs.existsSync(`${cache}/${userId}/activity`)){
        fs.mkdirSync(`${cache}/${userId}/activity`);
    }
  fs.writeFileSync(`${cache}/${userId}/activity/${activityId}.json`, JSON.stringify(activity));
};

module.exports = {
    userCacheExists,
    getUserCache,
    setUserCache,
    userActivitiesCacheExists,
    getUserActivitiesCache,
    setUserActivitiesCache,
    userActivityCacheExists,
    getUserActivityCache,
    setUserActivitiesCache
}