import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import {SonarrService} from "../../../shared/sonarr.service";
import {SonarrSeriesModel} from "../../../shared/domain/sonarr-series.model";
import {SonarrSeriesEpisode} from "../../../shared/domain/sonarr-series-episode.model";

@Component({
  selector: 'series-details',
  templateUrl: 'series-details.component.html',
  styleUrls: ['series-details.component.scss'],
  host: {'[@routerTransition]': ''},
  animations: [
    trigger('routerTransition', [
      transition(':enter', [  // before 2.1: transition('void => *', [
        style({opacity: 0}),
        animate('0.3s ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [  // before 2.1: transition('* => void', [
        style({opacity: 1}),
        animate('0.3s ease-in-out', style({opacity: 0}))
      ])
    ])]
})
export class SeriesDetailsComponent implements OnInit {

  activeSeason:number = null;

  episodes:Array<SonarrSeriesEpisode> = [];


  constructor(private sonarr:SonarrService, private router:Router) {
    // Do stuff
  }

  ngOnInit() {
      console.log('Hello About');
      if(!this.show){
        this.router.navigate(['/series'])
      } else {
        this.getEpisodes();
      }
  }

  getEpisodes(){
    this.sonarr.getEpisodesForSeries(this.show.id).subscribe(episodes => {
      console.log(episodes);
      this.episodes = episodes;
    })
  }

  ngOnDestroy(){
    this.sonarr.activeShow = null;
  }

  get show():SonarrSeriesModel{
    return this.sonarr.activeShow;
  }

  getEpisodesForSeason(seasonNumber:number){
    return this.episodes.filter(episode => episode.seasonNumber == seasonNumber);
  }

  getPoster(){
    return this.sonarr.getSeriesUrl(this.show, "poster");
  }

  getBanner(){
    return this.sonarr.getSeriesUrl(this.show, "banner");
  }


}
