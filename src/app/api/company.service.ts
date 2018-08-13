import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class CompanyService {

  private companyUrl: string;

  constructor(private http: Http, authHttp: AuthHttp) {
    this.companyUrl = `${environment.apiUrl}/companies`;
  }

  public save(company: any): Promise<any> {
    return this.http.post(this.companyUrl, company)
      .toPromise()
      .then(response => response.json());
  }

}
