import { Camera } from '@ionic-native/camera/ngx';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { DashboardOsservazionePageRoutingModule } from './dashboard-osservazione-routing.module';

import { DashboardOsservazionePage } from './dashboard-osservazione.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardOsservazionePageRoutingModule,
    IonicSelectableModule,
  ],
  providers: [
    NavParams,
    Camera
  ],
  declarations: [DashboardOsservazionePage]
})
export class DashboardOsservazionePageModule {}
