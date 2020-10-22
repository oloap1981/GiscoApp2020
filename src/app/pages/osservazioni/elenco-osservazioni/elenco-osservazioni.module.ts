import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoOsservazioniPageRoutingModule } from './elenco-osservazioni-routing.module';

import { ElencoOsservazioniPage } from './elenco-osservazioni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoOsservazioniPageRoutingModule
  ],
  declarations: [ElencoOsservazioniPage]
})
export class ElencoOsservazioniPageModule {}
