import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovoMessaggioPageRoutingModule } from './nuovo-messaggio-routing.module';

import { NuovoMessaggioPage } from './nuovo-messaggio.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovoMessaggioPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [NuovoMessaggioPage]
})
export class NuovoMessaggioPageModule {}
