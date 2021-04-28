import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoAttivitaPage } from './elenco-attivita.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoAttivitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoAttivitaPageRoutingModule {}
