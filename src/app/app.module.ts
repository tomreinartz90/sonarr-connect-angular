import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./routes/home/home.component";
import {SeriesComponent} from "./routes/series/series.component";
import {ConfigComponent} from "./routes/config/config.component";
import {StorageService, SonarrService} from "./shared";
import {routing} from "./app.routing";
import {SonarrUtil} from "./shared/sonarr.util";
import {EpisodeComponent} from "./components/episode/episode.component";
import {SeriesDetailsComponent} from "./routes/series/seriesdetails/series-details.component";
import {Showomponent} from "./components/show/show.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SeriesComponent,
    ConfigComponent,
    SeriesDetailsComponent,
    EpisodeComponent,
    Showomponent
  ],
  providers: [
    StorageService,
    SonarrUtil,
    SonarrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  // hmrOnInit(store) {
  //   console.log('HMR store', store);
  // }
  // hmrOnDestroy(store) {
  //   let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // recreate elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // remove styles
  //   removeNgStyles();
  // }
  // hmrAfterDestroy(store) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }
}
