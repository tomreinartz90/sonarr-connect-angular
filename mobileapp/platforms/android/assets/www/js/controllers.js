
angular.module('sonarrConnectApp.controllers',[])
//series list controller
.controller('SerieListController',function($scope,$state,$window,Series,ImageService){

  //map missing data
  var seriesData = Series.query(function(){
    newSeriesData = [];
    angular.forEach(seriesData, function(value, key) {
      posterImage = ImageService.getImage(value.images, "poster");
      fanartImage = ImageService.getImage(value.images, "fanart");

      newSeriesData.push({
        airTime: value.airTime,
        cleanTitle : value.cleanTitle,
        episodeCount : value.episodeCount,
        episodeFileCount : value.episodeFileCount, 
        posterImage : posterImage,
        fanartImage : fanartImage,
        monitored : value.monitored,
        network : value.network,
        seasonCount : value.seasonCount,
        sortTitle : value.sortTitle,
        title : value.title,
        year : value.year,
        id : value.id
      });
    });
    $scope.series = newSeriesData;
  });


})
//Serie view controller
.controller('SerieViewController',function($scope,$stateParams,Serie,ImageService){
  //map missing data
  var serieData = Serie.query({id: $stateParams.id},function(){
    posterImage = ImageService.getImage(serieData.images, "poster");
    fanartImage = ImageService.getImage(serieData.images, "fanart");

    newSerieData = {
      airTime: serieData.airTime,
      cleanTitle : serieData.cleanTitle,
      episodeCount : serieData.episodeCount,
      episodeFileCount : serieData.episodeFileCount, 
      posterImage : posterImage,
      fanartImage : fanartImage,
      monitored : serieData.monitored,
      network : serieData.network,
      seasonCount : serieData.seasonCount,
      sortTitle : serieData.sortTitle,
      title : serieData.title,
      year : serieData.year,
      id : serieData.id,
      overview : serieData.overview
    };
    $scope.serie = newSerieData;
  });




})
//history list controller
.controller('HistoryListController',function($scope,$stateParams,History){
  //get history data and store it into var : data
  var historyData = History.query(function(){
    newHistoryData = [];
    angular.forEach(historyData.records, function(value, key) {
      newHistoryData.push({
        showTitle : value.series.title,
        seriesId: value.series.id,
        title : value.episode.title,
        number : "S"+value.episode.seasonNumber +"E" + value.episode.episodeNumber,
        airdate : value.episode.airdate,
        hasfile: value.episode.hasFile,
        monitored: value.episode.hasFile,
        episodeId: value.episode.id,
        overview: value.episode.overview,
        status: value.eventType
      });
    });

    $scope.history = newHistoryData; 
  });

})


//calendar view controller
.controller('CalendarListController',function($scope,$stateParams,$filter,Calendar, Missing){
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
    newCalendarData = [];
    angular.forEach(calendarData, function(value, key) {
      newCalendarData.push({
        airDateUtc : value.airDateUtc,
        showTitle : value.series.title,
        seriesId: value.series.id,
        title : value.title,
        number : "S"+value.seasonNumber +"E" + value.episodeNumber,
        airdate : value.airdate,
        hasfile: value.hasFile,
        monitored: value.hasFile,
        episodeId: value.id,
        overview: value.overview,
        status : calendarStatus(value)
      });
    });
    console.log(newCalendarData);
    $scope.calendar = newCalendarData; 
  });

  //map missing data
  var missingData = Missing.query(function(){
    newMissingData = [];
    angular.forEach(missingData.records, function(value, key) {
      newMissingData.push({
        showTitle : value.series.title,
        seriesId: value.series.id,
        title : value.title,
        number : "S"+value.seasonNumber +"E" + value.episodeNumber,
        airdate : value.airdate,
        hasfile: value.hasFile,
        monitored: value.hasFile,
        episodeId: value.id,
        overview: value.overview,
      });
    });

    $scope.missing = newMissingData; 
  });


  //set dates for filtering
  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(0, 0, 0, 0);
  var dayAfterTomorrow = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
  dayAfterTomorrow.setHours(0, 0, 0, 0);

  //filter today
  $scope.todayFilter = function (episode) { 
    if(new Date(episode.airDateUtc).valueOf() >= new Date().setHours(0, 0, 0, 0).valueOf() && new Date(episode.airDateUtc).valueOf() <= tomorrow.valueOf()) { 
      return true;
    } else { 
      return false;
    }
  }

  //filter tomorrow
  $scope.tomorrowFilter = function (episode) { 
    if(new Date(episode.airDateUtc).valueOf() >= tomorrow.valueOf() 
       && new Date(episode.airDateUtc).valueOf() <= dayAfterTomorrow.valueOf()) {
      return true;
    }else {
      return false;
    }
  }

  //filter later
  $scope.laterFilter = function (episode) { 
    if(new Date(episode.airDateUtc).valueOf() >= dayAfterTomorrow.valueOf()){
      return true;
    } else {
      return false;
    }
  }

  console.log($scope.today);

})
//episode controller
.controller('episodeController',function($scope,$stateParams){

});