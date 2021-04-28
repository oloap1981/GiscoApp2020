import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UscitaMessaggiPage } from './uscita-messaggi.page';

const routes: Routes = [
  {
    path: '',
    component: UscitaMessaggiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UscitaMessaggiPageRoutingModule {}
