/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('sonarrConnectApp.services',['ngResource'])
//get data for movie list
.factory('DataFactory',function($resource, $q, $rootScope, UtilService, Serie, Series, History, Wanted, Episodes, Calendar){
  /* define variables */

  var df = this;
  df.series = {};
  df.episodes = {};//episodes by seriesid
  df.calendar = {};
  df.wanted = {};
  df.history = {};
  df.totalMissing = 0;
  df.config = {};


  df.calendarStatus = function (episode){ 
    if(episode.hasFile)
    {
      return 'Downloaded';
    }
    else
    {
      return 'missing';
    }
  }

  if(typeof localStorage.getItem('series') === "string"){
    df.series = JSON.parse(localStorage.getItem('series')); 
  }
  if(typeof localStorage.getItem('calendar') === "string"){
    df.calendar = JSON.parse(localStorage.getItem('calendar')); 
  }
  if(typeof localStorage.getItem('wanted') === "string"){
    df.history = JSON.parse(localStorage.getItem('wanted')); 
  }  
  if(typeof localStorage.getItem('episodes') === "string"){
    df.episodes = JSON.parse(localStorage.getItem('episodes')); 
  }

  /* get all series */
  df.getSeries = function(){
    UtilService.showLoader();
    var seriesList = {};
    var SeriesRequestData = Series.query(function(response) {
      //process data
      angular.forEach(SeriesRequestData, function(value, key) {
        seriesList[value.id] = value;
      });

      //store data in local storage
      df.series = seriesList;
      localStorage.setItem('series', JSON.stringify(df.series));   
      $rootScope.$broadcast('series:updated');
      UtilService.hideLoader();
    });
    return df.series;
  }

  df.getSerie = function (id) { 
    UtilService.showLoader();
    var serie = {};
    var serieId = id;

    var SerieRequestData = Serie.query({id: serieId}, function(response) {
      //process data
      df.series[serieId] = SerieRequestData;
      localStorage.setItem('series', JSON.stringify(df.series));  
      $rootScope.$broadcast('series:updated');
      UtilService.hideLoader();
    });
    return df.series[id];
  }  

  df.getEpisodes = function (id) { 
    var episodes = {};
    var serieId = id;
    UtilService.showLoader();
    var episodeRequestData = Episodes.query({id: serieId}, function(response) {
      //process data
      var episodes = {};
      angular.forEach(episodeRequestData, function(value, key) {
        var data = {};
        data.status = df.calendarStatus(value);
        data.series = value.series;
        delete value.series;
        data.episode = value;
        episodes[key] = data;
      });
      df.episodes[serieId] = episodes;
      localStorage.setItem('episodes', JSON.stringify(df.episodes));  
      $rootScope.$broadcast('episodes:updated');
      UtilService.hideLoader();
    });
  }

  df.getCalendar = function () { 
    UtilService.showLoader();
    var calendarData = Calendar.query(function(){
      df.calendar = {};
      angular.forEach(calendarData, function(value, key) {
        var data = {};
        data.status = df.calendarStatus(value);
        data.series = value.series;
        delete value.series;
        data.episode = value;
        df.calendar[key] = data;
      });

      localStorage.setItem('calendar', JSON.stringify(df.calendar));  
      $rootScope.$broadcast('calendar:updated');
      UtilService.hideLoader();
    });
    return df.calendar;
  }


  df.getWanted = function () { 
    var wantedData = Wanted.query(function(){
      df.wanted = {};
      angular.forEach(wantedData.records, function(value, key) {
        var data = {};
        data.status = df.calendarStatus(value);
        data.series = value.series;
        delete value.series;
        data.episode = value;
        df.wanted[key] = data;
      });
      df.totalMissing = wantedData.totalRecords;
      localStorage.setItem('wanted', JSON.stringify(df.wanted));  
      $rootScope.$broadcast('wanted:updated');
    });
    return df.history;
  }  

  df.getHistory = function () { 
    UtilService.showLoader();
    var historyData = History.query(function(){
      angular.forEach(historyData.records, function(value, key) {
        var data = {};
        data.status = df.calendarStatus(value);

        data.series = value.series;
        delete value.series;
        data.episode = value.episode;
        df.history[key] = data;
      });
      localStorage.setItem('history', JSON.stringify(df.history));  
      $rootScope.$broadcast('history:updated');
      UtilService.hideLoader();
    });
    return df.history;
  }

  return df;
})
.factory('Series',function($resource, Config){
  return $resource(
    Config.url + 'api/series/?page=1&sortKey=title&sortDir=desc&apikey=' + Config.apiKey,
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: true }}
  );
})
.factory('Serie',function($resource, Config){
  return $resource(
    Config.url + 'api/series/:id?page=1&sortKey=title&sortDir=desc&apikey=' + Config.apiKey,
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: false }}
  );
})
.factory('Episodes',function($resource, Config){
  return $resource(
    Config.url + 'api/episode?seriesId=:id&apikey=' + Config.apiKey,
    {'query': { method: 'GET', isArray: false }}
  );
})
.factory('SearchEpisode',function($resource, Config){
  return $resource(
    Config.url + 'api/Command?apikey=' + Config.apiKey,
    { name: 'episodesearch', episodeIds: '@episodeIds' }, // Query parameters
    {'query': { method: 'GET', isArray: true }}
  );
})
.factory('Calendar',function($resource, UtilService, Config){
  var today = UtilService.formatDate(new Date());
  var endDate = UtilService.formatDate(new Date(), 7);

  return $resource(
    Config.url + 'api/calendar?start='+ today +'&end='+ endDate +'&apikey=' + Config.apiKey,
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: true }}
  );
})
.factory('Wanted',function($resource, Config){
  return $resource(
    Config.url + 'api/wanted/missing?page=1&pageSize=15&sortKey=airDateUtc&sortDir=desc&apikey=' + Config.apiKey,
    { method: 'getTask', q: '*' }, // Query parameters
    {'query': { method: 'GET', isArray: false }}
  );
})
.factory('History',function($resource, Config){
  return $resource(
    Config.url + 'api/history?page=1&pageSize=15&sortKey=date&sortDir=desc&apikey=' + Config.apiKey,
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
.service('UtilService',function($window, LxProgressService){
  //format episodenumbers to match scene formatting
  this.formatEpisodeNumer = function(seasonNumber, episodeNumber) {
    var episodeNum = "S" + (seasonNumber.toString().length === 1 ? '0' : '') + seasonNumber + "E" + (episodeNumber.toString().length === 1 ? '0' : '') + episodeNumber;
    return episodeNum;
  }

  this.showLoader = function(){
    LxProgressService.linear.show('#5fa2db', '#progress');
  }
  this.hideLoader = function(){
    LxProgressService.linear.hide();
  }

  this.calculateEpisodeQuoteColor = function(episodeFileCount, totalEpisodeCount, monitored, status) {
    var episodeQuote = {
      'continuing' : 'label regular',
      'ended' : 'label success',
      'missing-monitored' : 'label alert',
      'missing-not-monitored' : 'label warning'
    }

    var label = ""
    if (episodeFileCount == totalEpisodeCount)
      if (status == 'continuing')
        label = episodeQuote['continuing'];
      else
        label = episodeQuote['ended'];
    else if (monitored)
      label = episodeQuote['missing-monitored'];
    else
      label = episodeQuote['missing-not-monitored'];

    return label;
  }

  this.formatDate =  function(date, positiveOffset) {
    if (positiveOffset != null)
      date.setDate(date.getDate() + parseInt(positiveOffset));
    return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()));
  }


  //set dates for filtering
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(0, 0, 0, 0);
  var dayAfterTomorrow = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
  dayAfterTomorrow.setHours(0, 0, 0, 0);

  //filter today
  this.todayFilter = function (episode) { 
    if(new Date(episode.episode.airDateUtc).valueOf() >= today.valueOf() && new Date(episode.episode.airDateUtc).valueOf() <= tomorrow.valueOf()) { 
      return true;
    } else { 
      return false;
    }
  }

  //filter tomorrow
  this.tomorrowFilter = function (episode) { 
    if(new Date(episode.episode.airDateUtc).valueOf() >= tomorrow.valueOf() 
       && new Date(episode.episode.airDateUtc).valueOf() <= dayAfterTomorrow.valueOf()) {
      return true;
    }else {
      return false;
    }
  }

  //filter later
  this.laterFilter = function (episode) { 
    if(new Date(episode.airDateUtc).valueOf() >= dayAfterTomorrow.valueOf()){
      return true;
    } else {
      return false;
    }
  }
});