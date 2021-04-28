import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardSitoPageRoutingModule } from './dashboard-sito-routing.module';

import { DashboardSitoPage } from './dashboard-sito.page';
import { MapComponent } from 'src/app/components/map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    DashboardSitoPageRoutingModule
  ],
  declarations: [DashboardSitoPage, MapComponent]
})
export class DashboardSitoPageModule {}
