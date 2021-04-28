import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardProfiloPageRoutingModule } from './dashboard-profilo-routing.module';

import { DashboardProfiloPage } from './dashboard-profilo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardProfiloPageRoutingModule
  ],
  declarations: [DashboardProfiloPage]
})
export class DashboardProfiloPageModule {}
