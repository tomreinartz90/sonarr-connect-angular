import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SonarrService} from "../../shared/sonarr.service";
import {SonarrSeriesModel} from "../../shared/domain/sonarr-series.model";
import {routerTransition, fadeInOut} from "../../shared/animation.util";

@Component({
  selector: 'series',
  templateUrl: 'series.component.html',
  animations: [fadeInOut()],
  host: {'[@fadeInOut]': ''}
})
export class SeriesComponent implements OnInit {

  series: Array<SonarrSeriesModel> = [];
  activeSeries: number = null;

  constructor(private sonarr: SonarrService, route: ActivatedRoute) {
    // Do stuff
    route.params.subscribe(resp => {
      this.activeSeries = resp['id'];
      // console.log('params:', resp);
    });
  }

  ngOnInit() {
    this.getSeries();
    this.sonarr.activeShow = null;
  }

  get show(): SonarrSeriesModel {
    return this.sonarr.activeShow;
  }

  getSeries() {
    this.sonarr.getSeries().subscribe(resp => {
      this.series = resp;
    })
  }


}
