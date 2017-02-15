import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SonarrService} from "../../../shared/sonarr.service";
import {SonarrSeriesModel} from "../../../shared/domain/sonarr-series.model";
import {SonarrSeriesEpisode} from "../../../shared/domain/sonarr-series-episode.model";
import {SonarrUtil} from "../../../shared/sonarr.util";
import {serieDetailAnimation} from "../../../shared/animation.util";

@Component({
  selector: 'series-details',
  templateUrl: 'series-details.component.html',
  host: {'[@slideToTop]': ''},
  animations: [serieDetailAnimation()]
})
export class SeriesDetailsComponent implements OnInit {

  activeSeason: number = null;

  episodes: Array<SonarrSeriesEpisode> = [];
  activeShow: number = null;

  constructor(private sonarr: SonarrService, private router: Router, private util: SonarrUtil, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.activeShow = params['id'];
    });
  }

  // Do stuff

  ngOnInit() {
    this.sonarr.getSeries().subscribe(resp => {
      this.sonarr.activeShow = resp.find(show => show.id == this.activeShow);
      this.getEpisodes();
    });
    if (this.show) {
      this.getEpisodes();
    }
  }

  getEpisodes() {
    this.sonarr.getEpisodesForSeries(this.show.id).subscribe(episodes => {
      console.log(episodes);
      this.episodes = episodes;
    })
  }

  getEpisodeLabelClass() {
    if (this.show) {
      return this.util.calculateEpisodeQuoteColor(this.show.episodeFileCount, this.show.episodeCount, this.show.monitored, this.show.status)
    }
  }

  ngOnDestroy() {
    this.sonarr.activeShow = null;
  }

  get show(): SonarrSeriesModel {
    return this.sonarr.activeShow;
  }

  getEpisodesForSeason(seasonNumber: number) {
    return this.episodes.filter(episode => episode.seasonNumber == seasonNumber);
  }

  getPoster() {
    return this.sonarr.getSeriesUrl(this.show, "poster");
  }

  getBanner() {
    return this.sonarr.getSeriesUrl(this.show, "banner");
  }


}
