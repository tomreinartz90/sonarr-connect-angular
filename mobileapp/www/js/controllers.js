
angular.module('sonarrConnectApp.controllers',[])
//series list controller
.controller('SerieListController',function($scope,$state,$window,serieModel,DataFactory){
  //map missing data


  $scope.series = DataFactory.series;

  //request all series
  DataFactory.getSeries();
})
//Serie view controller
.controller('SerieViewController',function($scope,$stateParams,DataFactory){
  //map missing data 
  if(typeof DataFactory.series[$stateParams.id] == "object")
    $scope.serie = DataFactory.series[$stateParams.id];

  //get updated serie data from api
  DataFactory.getSeries();
})
//history list controller
.controller('HistoryListController',function($scope,$state,$stateParams,History,episodeModel){
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
.controller('CalendarListController',function($scope,$stateParams,$filter,Calendar, Missing, episodeModel){
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

  //map missing data
  var calendarData = Calendar.query(function(){
    newTodayCalendarData = [];
    newTomorrowCalendarData = [];
    newLaterCalendarData = [];
    angular.forEach(calendarData, function(value, key) {

      var data = {};
      data.status = calendarStatus(value);
      data.series = value.series;
      delete value.series;
      data.episode = value;

      //put data in right list
      if(todayFilter(data))
        newTodayCalendarData.push(new episodeModel.build(data));      
      else if(tomorrowFilter(data))
        newTomorrowCalendarData.push(new episodeModel.build(data));      
      else 
        newLaterCalendarData.push(new episodeModel.build(data));
    });

    //set data on scope
    $scope.today = newTodayCalendarData; 
    $scope.tomorrow = newTomorrowCalendarData; 
    $scope.later = newLaterCalendarData; 

  });

  //map missing data
  var missingData = Missing.query(function(){
    newMissingData = [];
    angular.forEach(missingData.records, function(value, key) {

      var data = {};
      data.status = calendarStatus(value);
      data.series = value.series;
      delete value.series;
      data.episode = value;
      console.log(value);

      newMissingData.push(new episodeModel.build(data));
    });
    $scope.missing = newMissingData; 
    $scope.totalMissing = missingData.totalRecords;
  });


  //set dates for filtering
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(0, 0, 0, 0);
  var dayAfterTomorrow = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
  dayAfterTomorrow.setHours(0, 0, 0, 0);

  //filter today
  var todayFilter = function (episode) { 
    if(new Date(episode.episode.airDateUtc).valueOf() >= today.valueOf() && new Date(episode.episode.airDateUtc).valueOf() <= tomorrow.valueOf()) { 
      return true;
    } else { 
      return false;
    }
  }

  //filter tomorrow
  var tomorrowFilter = function (episode) { 
    if(new Date(episode.episode.airDateUtc).valueOf() >= tomorrow.valueOf() 
       && new Date(episode.episode.airDateUtc).valueOf() <= dayAfterTomorrow.valueOf()) {
      return true;
    }else {
      return false;
    }
  }

  //filter later
  var laterFilter = function (episode) { 
    if(new Date(episode.airDateUtc).valueOf() >= dayAfterTomorrow.valueOf()){
      return true;
    } else {
      return false;
    }
  }

  console.log($scope.today);

})
//episode controller
.controller('episodeController', function($scope,$stateParams){
  $scope.changeWatchedStatus = function(episodeId){
    console.log(episodeId);
  }
});