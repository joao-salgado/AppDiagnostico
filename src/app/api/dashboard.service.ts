import { BWHttp } from './../core/security/bw-http.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DashboardService {

  private dashboardUrl: string;
  private dashboardCompanyUrl: string;

  constructor(private authHttp: BWHttp) {
    this.dashboardUrl = `${environment.apiUrl}/statistics`;
    this.dashboardCompanyUrl = `${this.dashboardUrl}/companies`;

  }

  public getByCompany(companyId: string, diagnosis: string, filter: any): Observable<any> {

    let params = new HttpParams();

    if (filter.role) {
      params = params.append('role', String(filter.role));
    }

    if (filter.period && filter.period[0]) {
      params = params.append('start', String(filter.period[0]));
    }

    if (filter.period && filter.period[1]) {
      params = params.append('end', String(filter.period[1]));
    }

    return this.authHttp.get(`${this.dashboardCompanyUrl}/${companyId}/${diagnosis}`, {
      params: params
    });
  }

}
