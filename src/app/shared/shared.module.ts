import { DiagnosisBasicResultComponent } from './diagnosis/basic-result/diagnosis-basic-result.component';
import { DiagnosisLandingPageComponent } from './diagnosis/landing-page/landing-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DiagnosisListComponent } from './diagnosis/list/diagnosis-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    DiagnosisLandingPageComponent,
    DiagnosisBasicResultComponent,
    ComingSoonComponent,
    DiagnosisListComponent
  ],
  declarations: [
    DiagnosisLandingPageComponent,
    DiagnosisBasicResultComponent,
    ComingSoonComponent,
    DiagnosisListComponent
  ]
})
export class SharedModule { }
