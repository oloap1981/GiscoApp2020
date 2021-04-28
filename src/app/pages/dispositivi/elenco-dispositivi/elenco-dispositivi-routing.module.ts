import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoDispositiviPage } from './elenco-dispositivi.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoDispositiviPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoDispositiviPageRoutingModule {}
