import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { DashboardChiusuraPageRoutingModule } from './dashboard-chiusura-routing.module';

import { DashboardChiusuraPage } from './dashboard-chiusura.page';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardChiusuraPageRoutingModule
  ],
  providers: [
    NavParams,
    Camera,
    DatePipe
  ],
  declarations: [DashboardChiusuraPage]
})
export class DashboardChiusuraPageModule {}
