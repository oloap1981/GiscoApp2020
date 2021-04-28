import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardProcedimentoPageRoutingModule } from './dashboard-procedimento-routing.module';

import { DashboardProcedimentoPage } from './dashboard-procedimento.page';
import { ProgressBarComponent } from 'src/app/components/progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardProcedimentoPageRoutingModule
  ],
  declarations: [DashboardProcedimentoPage, ProgressBarComponent]
})
export class DashboardProcedimentoPageModule {}
