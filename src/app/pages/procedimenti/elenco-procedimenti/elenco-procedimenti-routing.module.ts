import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoProcedimentiPage } from './elenco-procedimenti.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoProcedimentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoProcedimentiPageRoutingModule {}
