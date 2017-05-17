import { Component, OnInit } from '@angular/core';
import { SonarrService } from "../../shared/sonarr.service";
import { fadeInOut } from "../../shared/animation.util";

@Component( {
  selector: 'my-home',
  templateUrl: 'home.component.html',
  animations: [ fadeInOut ],
  host: { '[@fadeInOut]': '' }
} )
export class HomeComponent implements OnInit {

  wanted: any;
  calendar: any;

  constructor( private sonarr: SonarrService ) {
  }

  ngOnInit() {
    this.getWanted();
  }

  getWanted() {
    this.sonarr.getWanted().subscribe( resp => {
      this.wanted = resp;
    } )
  }

}
