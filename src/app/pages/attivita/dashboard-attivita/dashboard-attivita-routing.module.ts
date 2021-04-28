import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAttivitaPage } from './dashboard-attivita.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardAttivitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAttivitaPageRoutingModule {}
