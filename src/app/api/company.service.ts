import { HttpClient } from '@angular/common/http';
import { BWHttp } from './../core/security/bw-http.service';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class CompanyService {

  private companyUrl: string;

  constructor(private authHttp: BWHttp, private http: HttpClient) {
    this.companyUrl = `${environment.apiUrl}/companies`;
  }

  public save(company: any): Promise<any> {
    return this.http.post(this.companyUrl, company).toPromise();
  }

}
