import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardComunicazionePageRoutingModule } from './dashboard-comunicazione-routing.module';

import { DashboardComunicazionePage } from './dashboard-comunicazione.page';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardComunicazionePageRoutingModule
  ],
  providers: [File],
  declarations: [DashboardComunicazionePage]
})
export class DashboardComunicazionePageModule {}
