import { BWHttp } from './../core/security/bw-http.service';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { CompanyProcessService } from './company-process.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteService } from './invite.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    BWHttp,
    CompanyProcessService,
    CompanyService,
    UserService,
    InviteService
  ]
})
export class ApiModule { }
