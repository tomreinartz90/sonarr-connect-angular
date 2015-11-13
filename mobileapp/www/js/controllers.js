
angular.module('sonarrConnectApp.controllers',[])
//series list controller
    .controller('SerieListController',function($scope,$state,$window,serieModel,DataFactory){
      //map missing data
      console.log();
      updateSeriesListScope();
      $scope.search = '';

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
    .controller('SerieViewController',function($scope,$state,$window,$stateParams,DataFactory,serieModel, episodeModel){
      //map missing data
      updateSerieScope();
      updateSerieEpisodeScope();

      $scope.$on('series:updated', function(event,data) {
        if(typeof DataFactory.series[$stateParams.id] == "object")
          updateSerieScope();
      });

      $scope.$on('episodes:updated', function(event,data) {
        updateSerieEpisodeScope();
      });




      function updateSerieScope(){
        var serie = new serieModel.build(DataFactory.series[$stateParams.id]);
        console.log(serie);
        $scope.serie = serie;
      }
      function updateSerieEpisodeScope(){
        if(typeof DataFactory.episodes[$stateParams.id] == "object"){
          var episodes = [];
          angular.forEach(DataFactory.episodes[$stateParams.id], function(value, key) {
            value.status = value.eventType;
            episodes.push(JSON.parse(JSON.stringify(new episodeModel.build(value))));
          });
          $scope.episodes = episodes;
        }
      }


      //get updated serie data from api
      DataFactory.getSerie($stateParams.id);
      DataFactory.getEpisodes($stateParams.id);

    })
//history list controller
    .controller('HistoryListController',function($scope,$state,$stateParams,DataFactory,episodeModel, DataFactory){
      //get history data and store it into var : data

      updateHistoryScope();
      $scope.$on('history:updated', function(event,data) {
        updateHistoryScope();
      });

      function updateHistoryScope(){
        newHistoryData = {};
        angular.forEach(DataFactory.history, function(value, key) {
          value.status = value.eventType;
          newHistoryData[key] = new episodeModel.build(value);
        });
        $scope.history = newHistoryData;
      }

      DataFactory.getHistory();
    })


//calendar view controller
    .controller('CalendarListController',function($scope,$stateParams,$filter,Calendar, Wanted, episodeModel, DataFactory, UtilService){
      //get data from service
      //  $scope.calendar = Calendar.query();
      function calendarStatus (episode){
        if(episode.hasFile){return 'Downloaded'; } else { return 'missing'; }
      }
      DataFactory.getCalendar().then(
          function(){
            console.log('ready');
          },
          function(){
            console.log('error');
          },
          function(data){
            console.log('update')
            updateCalendarScope(data);
          }
      );

      //updateCalendarScope(DataFactory.calendar);
      $scope.$on('calendar:updated', function(event,data) {
        updateCalendarScope(DataFactory.calendar)
      });
      //get updated calendar data
      //DataFactory.getCalendar();

      function updateCalendarScope(calendarData){
        console.log('got update');
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
    .controller('episodeController', function($scope,$stateParams, SearchEpisode, ManualSearchEpisode, LxDialogService){
      var ec = this;
      $scope.showDownloadButtons = false;
      $scope.showDownloads = false;

      $scope.changeWatchedStatus = function(episodeId){
        console.log(episodeId);
      }
      $scope.autoMaticDownload = function(episodeId){

        var episode = SearchEpisode.query({episodeIds: episodeId}, function(response) {
          console.log(episode);
          $scope.showDownloadButtons = false;
        });
      }
      $scope.manualDownload = function(episodeId){
        $scope.downloads = ManualSearchEpisode.query({episodeId: episodeId}, function(response) {
          console.log(this);

        });
        $scope.showDownloads = true;
      }
    });