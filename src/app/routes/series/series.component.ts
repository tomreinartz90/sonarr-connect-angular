import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SonarrService} from "../../shared/sonarr.service";

@Component({
  selector: 'series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],

})
export class SeriesComponent implements OnInit {

  series:Array<any> = [];

  constructor(private sonarr:SonarrService, route:ActivatedRoute) {
    // Do stuff
    route.params.subscribe(resp => {
      console.log('params:', resp);
    });
  }

  ngOnInit() {
    this.getSeries();
    this.sonarr.activeShow = null;
  }

  get show(){
    return this.sonarr.activeShow;
  }

  getSeries(){
    this.sonarr.getSeries().subscribe(resp => {
      this.series = resp;
    })
  }




}
