import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoDocumentiPageRoutingModule } from './elenco-documenti-routing.module';

import { ElencoDocumentiPage } from './elenco-documenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoDocumentiPageRoutingModule
  ],
  declarations: [ElencoDocumentiPage]
})
export class ElencoDocumentiPageModule {}
