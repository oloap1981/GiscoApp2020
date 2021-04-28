import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoSitiPage } from './elenco-siti.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoSitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoSitiPageRoutingModule {}
