import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsMessaggioPageRoutingModule } from './details-messaggio-routing.module';

import { DetailsMessaggioPage } from './details-messaggio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsMessaggioPageRoutingModule
  ],
  declarations: [DetailsMessaggioPage]
})
export class DetailsMessaggioPageModule {}
