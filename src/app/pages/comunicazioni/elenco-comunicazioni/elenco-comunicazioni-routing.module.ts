import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoComunicazioniPage } from './elenco-comunicazioni.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoComunicazioniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoComunicazioniPageRoutingModule {}
