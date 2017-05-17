/**
 * @Author Reinartz.T
 * <<Explain class>> ${}
 */
import { Injectable } from "@angular/core";
import { StorageService, SonarrService } from "./index";
declare let chrome: any;

@Injectable()
export class ChromeService {

  constructor( private settings: StorageService, private sonarr: SonarrService ) {
    this.setTimer();
  }

  getItemsInHistory() {
    this.sonarr.getWanted( 0 ).subscribe( resp => {
      this.setBadge( resp.totalRecords );
    } )
  }

  setBadge( num:any ) {
    if(chrome && chrome.browserAction)
    if ( num > 0 ) {
      chrome.browserAction.setBadgeText( { text: num } );
    } else {
      chrome.browserAction.setBadgeText( { text: '' } );
    }
  }

  setTimer() {
    // set interval
    setInterval(() => {
      this.getItemsInHistory();
    },
        (this.settings.getSonarrConfig().backgroundInterval || 5) * 60000
    )

  }

}
