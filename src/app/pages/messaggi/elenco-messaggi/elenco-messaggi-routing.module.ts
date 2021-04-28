import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoMessaggiPage } from './elenco-messaggi.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoMessaggiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoMessaggiPageRoutingModule {}
