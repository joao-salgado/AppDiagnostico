import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class DashboardService {

  private dashboardUrl: string;
  private dashboardCompanyUrl: string;

  constructor(private http: HttpClient) {
    this.dashboardUrl = `${environment.apiUrl}/statistics`;
    this.dashboardCompanyUrl = `${this.dashboardUrl}/companies`;
  }

  public getByCompany(companyId: string, diagnosis: string, filter: any): Observable<any> {

    let params = new HttpParams();

    if (filter.role) {
      params = params.append('role', String(filter.role));
    }

    if (filter.experience) {
      params = params.append('experience', String(filter.experience));
    }

    if (filter.period && filter.period[0]) {
      params = params.append('start', moment(filter.period[0]).format('YYYY-MM-DD'));
    }

    if (filter.period && filter.period[1]) {
      params = params.append('end', moment(filter.period[1]).format('YYYY-MM-DD'));
    }

    params = params.append('company', companyId);

    return this.http.get(`${this.dashboardCompanyUrl}/${companyId}/${diagnosis}`, {
      params: params
    });
  }

  public getForRearcher(diagnosis: string, filter: any): Observable<any> {

    let params = new HttpParams();

    if (filter.role) {
      params = params.append('role', String(filter.role));
    }

    if (filter.process) {
      params = params.append('process', String(filter.process));
    }

    if (filter.experience) {
      params = params.append('experience', String(filter.experience));
    }

    if (filter.period && filter.period[0]) {
      params = params.append('start', moment(filter.period[0]).format('YYYY-MM-DD'));
    }

    if (filter.period && filter.period[1]) {
      params = params.append('end', moment(filter.period[1]).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.dashboardUrl}/rearchers/${diagnosis}`, {
      params: params
    });
  }

}
