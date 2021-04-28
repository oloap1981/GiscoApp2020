import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MappaDispositiviPage } from './mappa-dispositivi.page';

const routes: Routes = [
  {
    path: '',
    component: MappaDispositiviPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MappaDispositiviPageRoutingModule {}
