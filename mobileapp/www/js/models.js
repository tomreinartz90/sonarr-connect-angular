angular.module('sonarrConnectApp.models',[])
.factory('serieModel', ['ImageService', function (ImageService) {
  /**
   * Constructor, with class name
   */
  function serieModel(data) {
    // Public properties, assigned to the instance ('this')
    this.airTime = data.airTime;
    this.cleanTitle = data.cleanTitle;
    this.episodeCount = data.episodeCount;
    this.episodeFileCount = data.episodeFileCount; 
    this.monitored = data.monitored;
    this.network = data.network;
    this.seasonCount = data.seasonCount;
    this.sortTitle = data.sortTitle;
    this.title = data.title;
    this.year = data.year;
    this.id = data.id;
    this.overview = data.overview;
    this.images = data.images;
    this.posterImage = ImageService.getImage(data.images, "poster");
    this.fanartImage = ImageService.getImage(data.images, "fanart");
  }

  serieModel.build = function(data){
    if(typeof data == "object") { 
      return new serieModel(data);
    }
  }
  /**
   * Return the constructor function
   */
  return serieModel;
}]).factory('episodeModel', ['UtilService', function (UtilService) {
  /**
   * Constructor, with class name
   */
  function episodeModel(data) {
    // Public properties, assigned to the instance ('this')
    if (typeof data == "object"){
      this.showTitle = data.series.title;
      this.seriesId= data.series.id;
      this.title = data.episode.title;
      this.number = UtilService.formatEpisodeNumer(data.episode.seasonNumber, data.episode.episodeNumber);
      this.airdate = data.episode.airdate;
      this.hasfile = data.episode.hasFile;
      this.monitored = data.episode.hasFile;
      this.episodeId = data.episode.id;
      this.overview = data.episode.overview;
      this.status = data.status;
    } 
  }

  episodeModel.build = function(data){
    if(typeof data == "object") { 
      return new episodeModel(data);
    }
  }
  /**
   * Return the constructor function
   */
  return episodeModel;
}])
