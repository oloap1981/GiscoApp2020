import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoDispositiviPageRoutingModule } from './elenco-dispositivi-routing.module';

import { ElencoDispositiviPage } from './elenco-dispositivi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoDispositiviPageRoutingModule
  ],
  declarations: [ElencoDispositiviPage]
})
export class ElencoDispositiviPageModule {}
