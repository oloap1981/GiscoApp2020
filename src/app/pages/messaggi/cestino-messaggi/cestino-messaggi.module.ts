import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CestinoMessaggiPageRoutingModule } from './cestino-messaggi-routing.module';

import { CestinoMessaggiPage } from './cestino-messaggi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CestinoMessaggiPageRoutingModule
  ],
  declarations: [CestinoMessaggiPage]
})
export class CestinoMessaggiPageModule {}
