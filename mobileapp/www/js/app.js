/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('sonarrConnectApp',['ui.router','ngResource','sonarrConnectApp.controllers','sonarrConnectApp.services','sonarrConnectApp.models', 'lumx']);

angular.module('sonarrConnectApp').config(function($stateProvider,$httpProvider){
  $stateProvider.state('series',{
    url:'/movies',
    templateUrl:'partials/series.html',
    controller:'SerieListController'
  }).state('viewMovie',{
    url:'/movies/:id/view',
    templateUrl:'partials/show-view.html',
    controller:'SerieViewController'
  }).state('history',{
    url:'/history',
    templateUrl:'partials/history.html',
    controller:'HistoryListController'
  }).state('calendar',{
    url:'/calendar',
    templateUrl:'partials/calendar.html',
    controller:'CalendarListController'
  });
  console.log($stateProvider);
}).run(function($state){
  document.addEventListener("deviceready", function(){
    $state.go('calendar');
  }, false);
  document.addEventListener("ready", function() {
  });
  $state.go('calendar');
});

config = {
  url : 'http://nas.tomreinartz.com:8989/',
  apiKey : '7936875896514603891816219d4daaf0'
}
localStorage.setItem('config', JSON.stringify(config) )
