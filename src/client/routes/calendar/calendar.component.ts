import { Component, OnInit } from '@angular/core';
import { SonarrService } from "../../shared/sonarr.service";
import { routerTransition } from "../../shared/animation.util";
import { SonarrSeriesEpisode } from "shared/domain/sonarr-series-episode.model";

@Component( {
  selector: 'my-calendar',
  templateUrl: 'calendar.component.html',
  animations: [ routerTransition() ],
  host: { '[@fadeInOut]': '' }
} )
export class CalendarComponent implements OnInit {

  wanted: any;
  calendar: any;

  constructor( private sonarr: SonarrService ) {
    // Do stuff
  }

  ngOnInit() {
    console.log( 'Hello Home' );
    // this.getWanted();
    this.getCalendar();
  }

  getWanted() {
    this.sonarr.getWanted().subscribe( resp => {
      console.log( resp );
      this.wanted = resp;
    } )
  }

  getCalendar() {
    let calendarDates: Array<Date>                                                 = [];
    let groupedEpisodes: Array<{date: Date, episodes: Array<SonarrSeriesEpisode>}> = [];

    this.sonarr.getCalendar().subscribe( ( resp: Array<SonarrSeriesEpisode> ) => {
        //create list of dates where episodes are aired
        resp.forEach( episode => {
          calendarDates.push( new Date( episode.airDateUtc ) )
        } );
        calendarDates.filter( this.onlyUnique );
        calendarDates.forEach( date => {
          groupedEpisodes.push( {
            date: date,
            episodes: resp.filter( episode => new Date( episode.airDateUtc ).toDateString() === date.toDateString() )
          } );
        } )

      }
    )
  }

  onlyUnique( value: any, index: number, self: Array<any> ) {
    return self.indexOf( value ) === index;
  };

}
