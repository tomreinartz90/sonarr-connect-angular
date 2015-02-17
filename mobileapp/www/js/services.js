/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('sonarrConnectApp.services',['ngResource'])
//get data for movie list
.factory('DataFactory',function($resource, $q, serieModel, episodeModel, Serie, Series, History, Missing, Calendar){
  /* define variables */

  var data = {};
  data.series = {};
  data.episodes = {};//episodes by seriesid
  data.calendar = {};
  data.wanted = {};
  data.history = {};
  data.config = {};


  if(typeof localStorage.getItem('series') === "string"){
    data.series = JSON.parse(localStorage.getItem('series')); 
  }

  /* get all series */
  data.getSeries = function(){
    var seriesList = {};
    var SeriesRequestData = Series.query(function(response) {
      //process data
      angular.forEach(SeriesRequestData, function(value, key) {
        seriesList[value.id] = new serieModel.build(value);
      });

      //store data in local storage
      return $q.when(seriesList).then(function(response){
        angular.copy(seriesList, data.series);
        localStorage.setItem('series', JSON.stringify(data.series));   
      });
    });
  }

  data.getSerie = function (id) { 
    var serie = {}
    var SerieRequestData = Serie.query({id: id}, function(response) {
      serie = new serieModel.build(response);
      return $q.when(serie).then(function(response){
        angular.copy(serie, data.series[id]);
        localStorage.setItem('series', JSON.stringify(data.series));  
      });
    });
  }

  return data;
})
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
.service('UtilService',function($window){
  //format episodenumbers to match scene formatting
  this.formatEpisodeNumer = function(seasonNumber, episodeNumber) {
    var episodeNum = "S" + (seasonNumber.toString().length === 1 ? '0' : '') + seasonNumber + "E" + (episodeNumber.toString().length === 1 ? '0' : '') + episodeNumber;
    return episodeNum;
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
});