
angular.module('sonarrConnectApp.controllers',[])
//series list controller
.controller('SerieListController',function($scope,$state,$window,serieModel,DataFactory){
  //map missing data
  console.log();
  updateSeriesListScope();

  $scope.$on('series:updated', function(event,data) {
    updateSeriesListScope();
  });

  function updateSeriesListScope(){
    series = [];
    angular.forEach(DataFactory.series, function(value, key) {
      series.push(new serieModel.build(value));
    });
    $scope.series = series; 
    delete series;
  }

  //request all series
  DataFactory.getSeries();
})
//Serie view controller
.controller('SerieViewController',function($scope,$state,$window,$stateParams,DataFactory, serieModel){
  //map missing data 
  updateSerieScope();

  $scope.$on('series:updated', function(event,data) {
    if(typeof DataFactory.series[$stateParams.id] == "object")
      updateSerieScope();
  });

  function updateSerieScope(){
    $scope.serie = new serieModel.build(DataFactory.series[$stateParams.id]);
  }


  //get updated serie data from api
  DataFactory.getSerie($stateParams.id);
})
//history list controller
.controller('HistoryListController',function($scope,$state,$stateParams,History,episodeModel, DataFactory){
  //get history data and store it into var : data
  var historyData = History.query(function(){
    newHistoryData = [];
    angular.forEach(historyData.records, function(value, key) {
      value.status = value.eventType;
      newHistoryData.push(new episodeModel.build(value));
    });

    $scope.history = newHistoryData; 
  });

})


//calendar view controller
.controller('CalendarListController',function($scope,$stateParams,$filter,Calendar, Wanted, episodeModel, DataFactory, UtilService){
  //get data from service
  //  $scope.calendar = Calendar.query();
  function calendarStatus (episode){ 
    if(episode.hasFile)
    {
      return 'Downloaded';
    }
    else
    {
      return 'missing';
    }
  }

  updateCalendarScope(DataFactory.calendar);
  $scope.$on('calendar:updated', function(event,data) {
    updateCalendarScope(DataFactory.calendar)
  });
  //get updated calendar data
  DataFactory.getCalendar();

  function updateCalendarScope(calendarData){
    //map missing data
    newTodayCalendarData = [];
    newTomorrowCalendarData = [];
    newLaterCalendarData = [];
    angular.forEach(calendarData, function(data, key) {
      //put data in right list
      if(UtilService.todayFilter(data))
        newTodayCalendarData.push(new episodeModel.build(data));      
      else if(UtilService.tomorrowFilter(data))
        newTomorrowCalendarData.push(new episodeModel.build(data));      
      else if(UtilService.laterFilter(data))
        newLaterCalendarData.push(new episodeModel.build(data));
    });
    //set data on scope
    $scope.today = newTodayCalendarData; 
    $scope.tomorrow = newTomorrowCalendarData; 
    $scope.later = newLaterCalendarData;
  }

  updateMissingScope(DataFactory.wanted);
  $scope.$on('wanted:updated', function(event,data) {
    updateMissingScope(DataFactory.wanted)
  });
  //get updated calendar data
  DataFactory.getWanted();
  //map missing data
  function updateMissingScope(missingData){
    newMissingData = [];
    angular.forEach(missingData, function(value, key) {
      newMissingData.push(new episodeModel.build(value));
    });
    $scope.missing = newMissingData; 
    $scope.totalMissing = DataFactory.totalMissing;
  }


})
//episode controller
.controller('episodeController', function($scope,$stateParams){
  $scope.changeWatchedStatus = function(episodeId){
    console.log(episodeId);
  }  
  $scope.autoMaticDownload = function(episodeId){
    console.log(episodeId);
    $scope.showButtons = false;
  }  
  $scope.manualDownload = function(episodeId){
    console.log(episodeId);
    $scope.showButtons = false;
  }
  $scope.showButtons = false;
});