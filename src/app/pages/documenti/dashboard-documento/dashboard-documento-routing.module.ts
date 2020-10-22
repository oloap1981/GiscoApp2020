import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDocumentoPage } from './dashboard-documento.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDocumentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDocumentoPageRoutingModule {}
