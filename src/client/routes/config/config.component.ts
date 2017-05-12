import { Component, OnInit } from '@angular/core';
import { StorageService, SonarrConfig } from '../../shared/index';
import { fadeInOut } from "../../shared/animation.util";

@Component( {
  selector: 'my-about',
  templateUrl: 'config.component.html',
  animations: [ fadeInOut ],
  host: { '[@fadeInOut]': '' }
} )
export class ConfigComponent implements OnInit {

  config: SonarrConfig;

  constructor( private storage: StorageService ) {
    // Do stuff
  }

  ngOnInit() {
    console.log( 'Hello config' );
    this.getConfig();
  }

  getConfig() {
    this.config = this.storage.getSonarrConfig();
  }

  setConfig() {
    this.storage.setSonarrConfig( this.config );
  }

  testConfig() {

  }

}
