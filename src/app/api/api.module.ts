import { CompanyService } from './company.service';
import { CompanyProcessService } from './company-process.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CompanyProcessService,
    CompanyService
  ]
})
export class ApiModule { }
