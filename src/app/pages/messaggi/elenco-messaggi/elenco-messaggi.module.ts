import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoMessaggiPageRoutingModule } from './elenco-messaggi-routing.module';

import { ElencoMessaggiPage } from './elenco-messaggi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoMessaggiPageRoutingModule
  ],
  declarations: [ElencoMessaggiPage]
})
export class ElencoMessaggiPageModule {}
