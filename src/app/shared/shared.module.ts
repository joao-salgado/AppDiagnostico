import { DiagnosisBasicResultComponent } from './diagnosis/basic-result/diagnosis-basic-result.component';
import { DiagnosisLandingPageComponent } from './diagnosis/landing-page/landing-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports: [
    DiagnosisLandingPageComponent,
    DiagnosisBasicResultComponent
  ],
  declarations: [
    DiagnosisLandingPageComponent,
    DiagnosisBasicResultComponent
  ]
})
export class SharedModule { }
