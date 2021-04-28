import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovaAssegnazionePage } from './nuova-assegnazione.page';

const routes: Routes = [
  {
    path: '',
    component: NuovaAssegnazionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovaAssegnazionePageRoutingModule {}
