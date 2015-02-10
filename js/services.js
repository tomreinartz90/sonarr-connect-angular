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
.service('popupService',function($window){
  this.showPopup=function(message){
    return $window.confirm(message);
  }
});