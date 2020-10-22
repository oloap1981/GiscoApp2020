import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartellePageRoutingModule } from './cartelle-routing.module';

import { CartellePage } from './cartelle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartellePageRoutingModule
  ],
  declarations: [CartellePage]
})
export class CartellePageModule {}
