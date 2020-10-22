import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartellePage } from './cartelle.page';

const routes: Routes = [
  {
    path: '',
    component: CartellePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartellePageRoutingModule {}
