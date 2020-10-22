import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoDocumentiPage } from './elenco-documenti.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoDocumentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoDocumentiPageRoutingModule {}
