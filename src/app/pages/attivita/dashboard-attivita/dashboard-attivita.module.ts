import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardAttivitaPageRoutingModule } from './dashboard-attivita-routing.module';

import { DashboardAttivitaPage } from './dashboard-attivita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardAttivitaPageRoutingModule
  ],
  declarations: [DashboardAttivitaPage]
})
export class DashboardAttivitaPageModule {}
