/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('sonarrConnectApp',['ui.router','ngResource','sonarrConnectApp.controllers','sonarrConnectApp.services']);

angular.module('sonarrConnectApp').config(function($stateProvider,$httpProvider){
    $stateProvider
    .state('movies',{
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
}).run(function($state){
   $state.go('movies');
});