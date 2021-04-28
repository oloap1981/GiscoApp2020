import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardProcedimentoPage } from './dashboard-procedimento.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardProcedimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardProcedimentoPageRoutingModule {}
