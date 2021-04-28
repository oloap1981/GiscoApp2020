import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MappaSitiPageRoutingModule } from './mappa-siti-routing.module';

import { MappaSitiPage } from './mappa-siti.page';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from 'src/app/components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    MappaSitiPageRoutingModule
  ],
  declarations: [MappaSitiPage, MapComponent]
})
export class MappaSitiPageModule {}
