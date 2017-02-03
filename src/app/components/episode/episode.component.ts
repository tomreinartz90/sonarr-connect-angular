/**
 * Created by taren on 27-1-2017.
 */

import {Component, OnInit, Input} from '@angular/core';
import {SonarrUtil} from "../../shared/sonarr.util";

@Component({
    selector: 'episode',
    templateUrl: 'episode.component.html'
})
export class EpisodeComponent implements OnInit {

  @Input()
  episode:any;


  constructor(private util:SonarrUtil) { }

    ngOnInit() { }


    getEpisodeNumber(){
    if(this.episode){
      return this.util.formatEpisodeNumer(this.episode.seasonNumber, this.episode.episodeNumber)
    }
    }
}
