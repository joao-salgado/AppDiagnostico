import { UserTypeService } from './../../../api/user-type.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { CompanyService } from './../../../api/company.service';
import { UserService } from './../../../api/user.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CompanyProcessService } from './../../../api/company-process.service';
import { UserLoggedService } from './../../../core/user-logged.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-profile-details',
  templateUrl: 'profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  public user: any;
  public userSaved: any;
  public isLoading = false;

  public listCompanyProcesses: any;
  public listUserTypes: any;

  public bsConfig: any;

  constructor(private route: ActivatedRoute,
              public userLoggedService: UserLoggedService,
              private companyProcessService: CompanyProcessService,
              private userTypeService: UserTypeService,
              private localeService: BsLocaleService,
              private userService: UserService,
              private companyService: CompanyService,
              private toasty: ToastyService,
              private toastyConfig: ToastyConfig) {

    this.toastyConfig.theme = 'bootstrap';

    if (this.userLoggedService.isAdmin()) {
      this.companyProcessService.findAll().subscribe(response => {
        this.listCompanyProcesses = response;
      });
    } else {
      this.userTypeService.findAll().subscribe(response => {
        response.shift();
        this.listUserTypes = response;
      });
    }

    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY',
      maxDate: new Date(),
      minDate: new Date(1850, 0, 1)
    };

    this.localeService.use('pt-br');
  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.userSaved = JSON.parse(userLogged);
    });

    this.user = this.route.snapshot.data.user;
    this.user.company.birthdate = this.formatDate(this.user.company.birthdate);
    this.user.birthdate = this.formatDate(this.user.birthdate);
  }

  public saveCompany(user: any): void {

    this.isLoading = true;

    this.companyService.update(user.company).subscribe(response => {

      this.userLoggedService.updateUserLogged(user);

      this.toasty.success('Empresa alterada com sucesso.');
      this.isLoading = false;
    }, reject => {
      this.toasty.error('Erro ao alterar empresa.');
      this.isLoading = false;
    });

  }

  public saveUser(user: any): void {
    this.isLoading = true;

    this.userService.update(user).subscribe(response => {
      this.userLoggedService.updateUserLogged(user);
      this.toasty.success('Dados alterados com sucesso.');
      this.isLoading = false;
    }, reject => {
      this.toasty.error('Erro ao alterar dados.');
      this.isLoading = false;
    });
  }

  private formatDate(date): Date {

    if (!date) {
      return date;
    }
    const newDate = new Date();
    const formattedDate = date.split('-');

    newDate.setFullYear(formattedDate[0]);
    newDate.setMonth(Number(formattedDate[1]) - 1);
    newDate.setDate(Number(formattedDate[2]) + 1);

    return newDate;
  }

}
