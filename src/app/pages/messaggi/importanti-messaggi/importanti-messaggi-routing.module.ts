import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportantiMessaggiPage } from './importanti-messaggi.page';

const routes: Routes = [
  {
    path: '',
    component: ImportantiMessaggiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportantiMessaggiPageRoutingModule {}
