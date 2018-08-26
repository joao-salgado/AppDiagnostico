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
    DiagnosisLandingPageComponent
  ],
  declarations: [
    DiagnosisLandingPageComponent
  ]
})
export class SharedModule { }
