import { DiagnosisBasicResultComponent } from './diagnosis/basic-result/diagnosis-basic-result.component';
import { DiagnosisLandingPageComponent } from './diagnosis/landing-page/landing-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DiagnosisListComponent } from './diagnosis/list/diagnosis-list.component';
import { RouterModule } from '@angular/router';
import { DiagnosisFilterComponent } from './diagnosis/filter/diagnosis-filter.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DiagnosisAdvancedResultComponent } from './diagnosis/advanced-result/diagnosis-advanced-result.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    ChartsModule
  ],
  exports: [
    DiagnosisLandingPageComponent,
    DiagnosisBasicResultComponent,
    ComingSoonComponent,
    DiagnosisListComponent,
    DiagnosisFilterComponent,
    DiagnosisAdvancedResultComponent
  ],
  declarations: [
    DiagnosisLandingPageComponent,
    DiagnosisBasicResultComponent,
    ComingSoonComponent,
    DiagnosisListComponent,
    DiagnosisFilterComponent,
    DiagnosisAdvancedResultComponent
  ]
})
export class SharedModule { }
