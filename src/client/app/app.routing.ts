import {RouterModule, Routes, } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {HomeComponent} from '../routes/home/home.component';
import {SeriesComponent} from '../routes/series/series.component';
import {ConfigComponent} from '../routes/config/config.component';
import {SeriesDetailsComponent} from "../routes/series/seriesdetails/series-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'series', component: SeriesComponent,
    children: [{
      path: ':id',
      component: SeriesDetailsComponent
    }]
  },
  {path: 'config', component: ConfigComponent}
];

export const routing:ModuleWithProviders = RouterModule.forRoot(routes);
