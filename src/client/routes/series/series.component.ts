import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SonarrService} from "../../shared/sonarr.service";
import {SonarrSeriesModel} from "../../shared/domain/sonarr-series.model";

@Component({
  selector: 'series',
  templateUrl: 'series.component.html',
})
export class SeriesComponent implements OnInit {

  series:Array<SonarrSeriesModel> = [];

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

  get show():SonarrSeriesModel{
    return this.sonarr.activeShow;
  }

  getSeries(){
    this.sonarr.getSeries().subscribe(resp => {
      this.series = resp;
    })
  }




}
