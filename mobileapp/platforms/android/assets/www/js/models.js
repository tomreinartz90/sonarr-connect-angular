angular.module('sonarrConnectApp.models',[])
.factory('serieModel', ['ImageService', function (ImageService) {
  /**
   * Constructor, with class name
   */
  function serieModel(data) {
    // Public properties, assigned to the instance ('this')
    serie = {}
    serie.airTime = data.airTime;
    serie.cleanTitle = data.cleanTitle;
    serie.episodeCount = data.episodeCount;
    serie.episodeFileCount = data.episodeFileCount; 
    serie.monitored = data.monitored;
    serie.network = data.network;
    serie.seasonCount = data.seasonCount;
    serie.sortTitle = data.sortTitle;
    serie.title = data.title;
    serie.year = data.year;
    serie.id = data.id;
    serie.overview = data.overview;
    serie.images = data.images;
    serie.posterImage = ImageService.getImage(data.images, "poster");
    serie.fanartImage = ImageService.getImage(data.images, "fanart");
    
    //return data
    return serie;
  }

  serieModel.build = function(data){
    if(typeof data == "object") { 
      return serieModel(data);
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
      this.showButtons = false;
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
