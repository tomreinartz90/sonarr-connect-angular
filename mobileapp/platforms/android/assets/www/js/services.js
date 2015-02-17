/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('sonarrConnectApp.services',['ngResource'])
//get data for movie list
.factory('Series',function($resource){
  return $resource(
    'http://nas.tomreinartz.com:8989/api/series/?page=1&sortKey=title&sortDir=desc&apikey=7936875896514603891816219d4daaf0',
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: true }}
  );
})
.factory('Serie',function($resource){
  return $resource(
    'http://nas.tomreinartz.com:8989/api/series/:id?page=1&sortKey=title&sortDir=desc&apikey=7936875896514603891816219d4daaf0',
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: false }}
  );
})
.factory('Calendar',function($resource){
  return $resource(
    'http://nas.tomreinartz.com:8989/api/calendar?page=1&sortKey=airDateUtc&sortDir=desc&start=2015-2-10&end=2015-2-17&apikey=7936875896514603891816219d4daaf0',
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: true }}
  );
})
.factory('Missing',function($resource){
  return $resource(
    'http://nas.tomreinartz.com:8989/api/wanted/missing?page=1&pageSize=15&sortKey=airDateUtc&sortDir=desc&apikey=7936875896514603891816219d4daaf0',
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: false }}
  );
})
.factory('History',function($resource){
  return $resource(
    'http://nas.tomreinartz.com:8989/api/history?page=1&pageSize=15&sortKey=date&sortDir=desc&apikey=7936875896514603891816219d4daaf0',
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: false }}
  );
})
.service('Config', function(){

  var config = angular.fromJson(localStorage.getItem('config'));
  return config;

  this.updateConfig = function(newConfig){
    localStorage.setItem('config', JSON.stringify(newConfig));
  }
})
.service('ImageService', function(Config){
  Config.url
  this.getImage = function(images, imageType){
    if(typeof images == "object"){

      if(imageType == "poster" && typeof images[images.length -1] == "object" ){
        var start = images[images.length -1].url.indexOf('MediaCover')
        var newUrl = Config.url + "api/" +  images[images.length -1].url.substring(start) + "&apikey=" + Config.apiKey;
      } else if(typeof images[0] == "object") { 
        var start = images[0].url.indexOf('MediaCover')
        var newUrl = Config.url + "api/" +  images[1].url.substring(start) + "&apikey=" + Config.apiKey;

      }
      //return
      return newUrl;

    } else {
      var noimg = "";
      return  noimg;
    }    
  }
})
.service('popupService',function($window){
  this.showPopup=function(message){
    return $window.confirm(message);
  }
});