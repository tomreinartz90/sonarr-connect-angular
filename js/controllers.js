/**
 * Created by Sandeep on 01/06/14.
 */
angular.module('sonarrConnectApp.controllers',[])
//series list controller
.controller('SerieListController',function($scope,$state,$window,Series){
  $scope.series = Series.query();

})
//Serie view controller
.controller('SerieViewController',function($scope,$stateParams,Serie){
  $scope.serie = Serie.query({id: $stateParams.id});

})
//history list controller
.controller('HistoryListController',function($scope,$stateParams,History){
  //get history data and store it into var : data
  var historyData = History.query(function(){
    newHistoryData = [];
    angular.forEach(historyData.records, function(value, key) {
      newHistoryData.push({
        showTitle : value.series.title,
        showId: value.series.id,
        title : value.episode.title,
        episode : value.episode.seasonNumber + value.episode.episodeNumber,
        airdate : value.episode.airdate,
        hasfile: value.episode.hasFile,
        monitored: value.episode.hasFile,
        episodeId: value.episode.id,
        overview: value.episode.overview,
        eventType: value.eventType
      });
    });
    
    $scope.history = newHistoryData; 
  });

})
//calendar view controller
.controller('CalendarListController',function($scope,$stateParams,Calendar, Missing){
  $scope.calendar = Calendar.query();
  $scope.missing = Missing.query();

})
//episode controller
.controller('episodeController',function($scope,$stateParams){

});