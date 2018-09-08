import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from './../../shared/shared.module';
import { BWComponent } from './bw/bw.component';
import { DiagnosisRoutingModule } from './diagnosis.routing';
import { ToastyModule } from 'ng2-toasty';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  imports: [
    DiagnosisRoutingModule,
    FormsModule,
    CommonModule,
    TabsModule,
    ToastyModule,
    SharedModule,
    SweetAlert2Module
  ],
  declarations: [
    BWComponent
  ]
})
export class DiagnosisModule { }
