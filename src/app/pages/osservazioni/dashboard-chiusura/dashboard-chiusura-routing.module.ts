import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardChiusuraPage } from './dashboard-chiusura.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardChiusuraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardChiusuraPageRoutingModule {}
