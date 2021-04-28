import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoComunicazioniPageRoutingModule } from './elenco-comunicazioni-routing.module';

import { ElencoComunicazioniPage } from './elenco-comunicazioni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoComunicazioniPageRoutingModule
  ],
  declarations: [ElencoComunicazioniPage]
})
export class ElencoComunicazioniPageModule {}
