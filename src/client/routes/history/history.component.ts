import { Component, OnInit } from '@angular/core';
import { SonarrService } from "../../shared/sonarr.service";
import { fadeInOut } from "../../shared/animation.util";
import  groupBy from "lodash/groupBy";
@Component( {
  selector: 'my-history',
  templateUrl: 'history.component.html',
  animations: [ fadeInOut ],
  host: { '[@fadeInOut]': '' }
} )
export class HistoryComponent implements OnInit {

  history: Array<Array<any>>;

  constructor( private sonarr: SonarrService ) {
  }

  ngOnInit() {
    this.getWanted();
  }

  getWanted() {
    this.sonarr.getHistory().subscribe( resp => {
      let data = groupBy(resp, 'episodeId');
      this.history = Object.keys(data).map((key:string) => {
        return data[key];
        // return {
        //   episodeId: key,
        //   history: data[key]/
        // };
      });
      console.log(this.history);
    } )
  }

}
