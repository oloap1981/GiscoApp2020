import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoTipologiePage } from './elenco-tipologie.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoTipologiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoTipologiePageRoutingModule {}
