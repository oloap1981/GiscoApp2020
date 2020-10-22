import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoTipologiePageRoutingModule } from './elenco-tipologie-routing.module';

import { ElencoTipologiePage } from './elenco-tipologie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoTipologiePageRoutingModule
  ],
  declarations: [ElencoTipologiePage]
})
export class ElencoTipologiePageModule {}
