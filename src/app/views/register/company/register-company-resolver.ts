import { CompanyProcessService } from './../../../api/company-process.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class RegisterCompanyResolver implements Resolve<any> {

  constructor(private companyProcessService: CompanyProcessService) {}

  resolve() {
    return this.companyProcessService.findAll();
  }
}
