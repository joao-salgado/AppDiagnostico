import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserTypeService } from '../../../api/user-type.service';
defineLocale('pt-br', ptBrLocale);

export class Filter {
  period: Array<any>;
  role: string;
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

  public filter: Filter;
  public bsConfig: any;
  public listUserTypes: any;

  public parentDivElement: any;
  public fixedElement: any;

  public isViewLoaded = false;

  constructor(private localeService: BsLocaleService,
              private userTypeService: UserTypeService) {

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
    console.log(this.filter);
  }


}
