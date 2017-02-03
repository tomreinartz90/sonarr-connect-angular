import {Component, OnInit} from '@angular/core';
import {SonarrService} from "../../shared/sonarr.service";

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  wanted: any;
  calendar: any;

  constructor(private sonarr: SonarrService) {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
    this.getWanted();
    this.getCalendar();
  }

  getWanted() {
    this.sonarr.getWanted().subscribe(resp => {
      console.log(resp);
      this.wanted = resp;
    })
  }

  getCalendar() {
    this.sonarr.getCalendar().subscribe(resp => {
      this.calendar = resp;
    })
  }

}