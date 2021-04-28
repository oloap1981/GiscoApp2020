import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoProcedimentiPageRoutingModule } from './elenco-procedimenti-routing.module';

import { ElencoProcedimentiPage } from './elenco-procedimenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoProcedimentiPageRoutingModule
  ],
  declarations: [ElencoProcedimentiPage]
})
export class ElencoProcedimentiPageModule {}
