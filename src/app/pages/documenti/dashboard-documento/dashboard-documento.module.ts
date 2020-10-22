import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDocumentoPageRoutingModule } from './dashboard-documento-routing.module';

import { DashboardDocumentoPage } from './dashboard-documento.page';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDocumentoPageRoutingModule
  ],
  declarations: [DashboardDocumentoPage],
  providers: [
    File
  ]
})
export class DashboardDocumentoPageModule {}
