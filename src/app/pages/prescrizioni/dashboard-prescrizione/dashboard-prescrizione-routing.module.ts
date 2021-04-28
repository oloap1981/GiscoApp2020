import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPrescrizionePage } from './dashboard-prescrizione.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPrescrizionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPrescrizionePageRoutingModule {}
