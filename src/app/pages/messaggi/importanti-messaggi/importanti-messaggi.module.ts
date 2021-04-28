import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportantiMessaggiPageRoutingModule } from './importanti-messaggi-routing.module';

import { ImportantiMessaggiPage } from './importanti-messaggi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportantiMessaggiPageRoutingModule
  ],
  declarations: [ImportantiMessaggiPage]
})
export class ImportantiMessaggiPageModule {}
