import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoAttivitaPageRoutingModule } from './elenco-attivita-routing.module';

import { ElencoAttivitaPage } from './elenco-attivita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoAttivitaPageRoutingModule
  ],
  declarations: [ElencoAttivitaPage]
})
export class ElencoAttivitaPageModule {}
