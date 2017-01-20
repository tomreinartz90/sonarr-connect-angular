import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { SeriesComponent } from './routes/series/series.component';
import { ConfigComponent } from './routes/config/config.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'series', component: SeriesComponent},
  { path: 'config', component: ConfigComponent }
];

export const routing = RouterModule.forRoot(routes);
