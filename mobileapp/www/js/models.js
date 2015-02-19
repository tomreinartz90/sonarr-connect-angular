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
    this.seasons = data.seasons;
    this.title = data.title;
    this.year = data.year;
    this.id = data.id;
    this.overview = data.overview;
    this.images = data.images;
    this.posterImage = ImageService.getImage(data.images, "poster");
    this.fanartImage = ImageService.getImage(data.images, "fanart");

    var formattedSeasons = [];

    /* Formatted Seasons */
    angular.forEach(data.seasons, function(value, key) {
      var season = {
        id : value.seasonNumber,
        label : "Season " + value.seasonNumber, 
        monitored : value.monitored,
      };
      if(value.seasonNumber == 0)
        season.label = "Specials";

      formattedSeasons.push(season);
    });
    this.formattedSeasons = formattedSeasons;
    this.selectedSeason = data.seasons[data.seasons.length-1].seasonNumber;

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
}]).factory('episodeModel', function(UtilService, DataFactory, ImageService) {
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
      this.episodeNumber = data.episode.episodeNumber;
      this.seasonNumber = data.episode.seasonNumber;
      this.airdate = data.episode.airdate;
      this.hasfile = data.episode.hasFile;
      this.monitored = data.episode.hasFile;
      this.episodeId = data.episode.id;
      this.overview = data.episode.overview;
      this.status = data.status;
      if(typeof DataFactory.series[data.series.id] == "object"){
        this.posterImage = ImageService.getImage(DataFactory.series[data.series.id].images, "poster");
        this.fanartImage = ImageService.getImage(DataFactory.series[data.series.id].images, "fanart");
      }
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
})
