import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserTypeService } from '../../../api/user-type.service';
import { UserLoggedService } from '../../../core/user-logged.service';
import { DashboardService } from '../../../api/dashboard.service';
import { ActivatedRoute } from '@angular/router';
defineLocale('pt-br', ptBrLocale);

export class Filter {
  period: Array<any>;
  role: string;
  experience: string;
}

@Component({
  selector: 'app-diagnosis-filter',
  templateUrl: 'diagnosis-filter.component.html',
  styleUrls: [
    './diagnosis-filter.component.scss'
  ]
})
export class DiagnosisFilterComponent implements OnInit, AfterViewInit {

  @Input() parentContainer: any;
  @Output() btnSendListener = new EventEmitter();

  public filter: Filter;
  public bsConfig: any;
  public listUserTypes: any;
  public user: any;

  public parentDivElement: any;
  public fixedElement: any;

  public isViewLoaded = false;

  constructor(private localeService: BsLocaleService,
              private userTypeService: UserTypeService,
              private userLoggedService: UserLoggedService,
              private dashboardService: DashboardService,
              private route: ActivatedRoute) {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });

    this.filter = new Filter();

    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY',
      maxDate: new Date(),
      minDate: new Date(1850, 0, 1)
    };

    this.localeService.use('pt-br');

    this.userTypeService.findAll().subscribe(response => {
      response.shift();
      this.listUserTypes = response;
    });
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.isViewLoaded = true;
    });
  }

  public send() {

    this.dashboardService.getByCompany(this.user.company.id,
                                        this.route.snapshot.data.diagnosis,
                                        this.filter)
      .subscribe(response => {
        this.btnSendListener.emit(response);
      });

  }

}
