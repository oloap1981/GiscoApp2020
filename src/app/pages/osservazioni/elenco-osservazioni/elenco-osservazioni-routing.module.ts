import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoOsservazioniPage } from './elenco-osservazioni.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoOsservazioniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoOsservazioniPageRoutingModule {}
