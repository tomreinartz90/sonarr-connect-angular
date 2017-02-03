/**
 * Created by taren on 27-1-2017.
 */
import {Component, OnInit, Input} from "@angular/core";
import {SonarrUtil} from "../../shared/sonarr.util";
import {SonarrSeriesModel} from "../../shared/domain/sonarr-series.model";
import {SonarrService} from "../../shared/sonarr.service";

@Component({
  selector: 'show',
  templateUrl: 'show.component.html'
})
export class Showomponent implements OnInit {

  @Input()
  show: SonarrSeriesModel;


  constructor(private util: SonarrUtil, private sonarr:SonarrService) {
  }

  ngOnInit() {
  }

  getPoster() {
    return this.sonarr.getSeriesUrl(this.show, "poster");
  }

  selectShow(show){
    this.sonarr.activeShow = show;
  }
}
