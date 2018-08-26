import { HttpClient } from '@angular/common/http';
import { BWHttp } from './../core/security/bw-http.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  private companyUrl: string;

  constructor(private authHttp: BWHttp, private http: HttpClient) {
    this.companyUrl = `${environment.apiUrl}/companies`;
  }

  public save(company: any): Observable<any> {
    return this.http.post(this.companyUrl, company);
  }

  public update(company: any): Observable<any> {
    return this.authHttp.put(`${this.companyUrl}/${company.id}`, company);
  }

}
