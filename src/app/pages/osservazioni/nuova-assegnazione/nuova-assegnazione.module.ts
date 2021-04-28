import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovaAssegnazionePageRoutingModule } from './nuova-assegnazione-routing.module';

import { NuovaAssegnazionePage } from './nuova-assegnazione.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovaAssegnazionePageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [NuovaAssegnazionePage]
})
export class NuovaAssegnazionePageModule {}
