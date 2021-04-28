import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UscitaMessaggiPageRoutingModule } from './uscita-messaggi-routing.module';

import { UscitaMessaggiPage } from './uscita-messaggi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UscitaMessaggiPageRoutingModule
  ],
  declarations: [UscitaMessaggiPage]
})
export class UscitaMessaggiPageModule {}
