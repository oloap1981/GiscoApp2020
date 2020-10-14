import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardOsservazionePage } from './dashboard-osservazione.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardOsservazionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardOsservazionePageRoutingModule {}
