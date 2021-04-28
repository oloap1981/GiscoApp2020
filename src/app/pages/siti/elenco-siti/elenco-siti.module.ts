import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoSitiPageRoutingModule } from './elenco-siti-routing.module';

import { ElencoSitiPage } from './elenco-siti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoSitiPageRoutingModule
  ],
  declarations: [ElencoSitiPage]
})
export class ElencoSitiPageModule {}
