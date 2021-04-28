import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComunicazionePage } from './dashboard-comunicazione.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardComunicazionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardComunicazionePageRoutingModule {}
