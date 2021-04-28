import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDispositivoPageRoutingModule } from './dashboard-dispositivo-routing.module';

import { DashboardDispositivoPage } from './dashboard-dispositivo.page';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from 'src/app/components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    DashboardDispositivoPageRoutingModule
  ],
  declarations: [DashboardDispositivoPage, MapComponent]
})
export class DashboardDispositivoPageModule {}
