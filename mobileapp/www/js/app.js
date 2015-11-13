/**
 */

angular.module('sonarrConnectApp',['ui.router','ngResource','sonarrConnectApp.controllers','sonarrConnectApp.services','sonarrConnectApp.models', 'lumx', 'foundation']);

angular.module('sonarrConnectApp').config(function($stateProvider,$httpProvider){
  $stateProvider
      .state('series',{
        url:'/movies',
        templateUrl:'partials/series.html',
        controller:'SerieListController',
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
}).run(function($state){
  $state.go('calendar');
  //FastClick.attach(document.body);
});

config = {
  url : 'http://192.168.1.100:8989/',
  apiKey : '7936875896514603891816219d4daaf0'
}
localStorage.setItem('config', JSON.stringify(config) )
