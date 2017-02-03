import {StorageService} from "./storage.service";
import {Injectable} from "@angular/core";

@Injectable()
export class SonarrUtil {

  constructor(private storage: StorageService) {

  }


  calculateEpisodeQuoteColor(episodeFileCount, totalEpisodeCount, monitored, status) {
    let episodeQuote = {
      'continuing': 'label regular',
      'ended': 'label success',
      'missing-monitored': 'label alert',
      'missing-not-monitored': 'label warning'
    };

    let label = "";
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

//format date to be used in api
//TODO improve

  formatDate(date, positiveOffset) {
    if (positiveOffset != null)
      date.setDate(date.getDate() + parseInt(positiveOffset));
    return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()));
  }

  getImageUrl(data) {
    if (typeof data == "object") {
      let start = data.url.indexOf('MediaCover');
      return this.storage.getSonarrConfig().url + "api/" + data.url.substring(start) + "&apikey=" + this.storage.getSonarrConfig().apiKey;
    } else {
      return "";
    }
  }

//format episodenumbers to match scene formatting
  formatEpisodeNumer = function (seasonNumber, episodeNumber) {
    return "S" + (seasonNumber.toString().length === 1 ? '0' : '') + seasonNumber + "E" + (episodeNumber.toString().length === 1 ? '0' : '') + episodeNumber;
  }

//comparator to sort seasons by seasonNumber
  seasonComparator(a, b) {
    if (a.seasonNumber < b.seasonNumber)
      return -1;
    else if (a.seasonNumber > b.seasonNumber)
      return 1;
    return 0;
  }

// comparator to sort seasons by seasonNumber
  seriesComparator(a, b) {
    if (a.status != b.status) {
      if (a.status < b.status)
        return -1;
      if (a.status > b.status)
        return 1;
      return 0;
    }
    if (a.sortTitle < b.sortTitle)
      return -1;
    if (a.sortTitle > b.sortTitle)
      return 1;
    return 0;
  }
}
