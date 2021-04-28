import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CestinoMessaggiPage } from './cestino-messaggi.page';

const routes: Routes = [
  {
    path: '',
    component: CestinoMessaggiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CestinoMessaggiPageRoutingModule {}
