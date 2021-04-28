import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPrescrizionePageRoutingModule } from './dashboard-prescrizione-routing.module';

import { DashboardPrescrizionePage } from './dashboard-prescrizione.page';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPrescrizionePageRoutingModule
  ],
  providers: [File],
  declarations: [DashboardPrescrizionePage]
})
export class DashboardPrescrizionePageModule {}
