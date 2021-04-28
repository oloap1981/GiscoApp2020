import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDispositivoPage } from './dashboard-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDispositivoPageRoutingModule {}
