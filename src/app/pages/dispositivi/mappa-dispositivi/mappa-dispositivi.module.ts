import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MappaDispositiviPageRoutingModule } from './mappa-dispositivi-routing.module';

import { MappaDispositiviPage } from './mappa-dispositivi.page';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from 'src/app/components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    MappaDispositiviPageRoutingModule
  ],
  declarations: [MappaDispositiviPage, MapComponent]
})
export class MappaDispositiviPageModule {}
