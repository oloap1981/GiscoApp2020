import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSitoPage } from './dashboard-sito.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSitoPageRoutingModule {}
