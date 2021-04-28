import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovoMessaggioPage } from './nuovo-messaggio.page';

const routes: Routes = [
  {
    path: '',
    component: NuovoMessaggioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovoMessaggioPageRoutingModule {}
