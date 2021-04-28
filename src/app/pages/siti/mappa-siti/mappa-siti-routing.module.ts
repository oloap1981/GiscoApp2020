import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MappaSitiPage } from './mappa-siti.page';

const routes: Routes = [
  {
    path: '',
    component: MappaSitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MappaSitiPageRoutingModule {}
