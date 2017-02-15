import { Component, OnInit } from '@angular/core';
import { SonarrService } from "../../shared/sonarr.service";
import { routerTransition } from "../../shared/animation.util";

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
    this.sonarr.getCalendar().subscribe( resp => {
      this.calendar = resp;
    } )
  }

}
