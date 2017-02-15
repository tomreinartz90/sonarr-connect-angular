import { Component, OnInit } from '@angular/core';
import { StorageService, SonarrConfig } from '../../shared/index';
import { routerTransition } from "../../shared/animation.util";

@Component( {
  selector: 'my-about',
  templateUrl: 'config.component.html',
  animations: [ routerTransition() ],
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
