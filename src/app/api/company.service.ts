import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  private companyUrl: string;

  constructor(private http: HttpClient) {
    this.companyUrl = `${environment.apiUrl}/companies`;
  }

  public getAll(): Observable<any> {
    return this.http.get(this.companyUrl);
  }

  public save(company: any): Observable<any> {
    return this.http.post(this.companyUrl, company);
  }

  public update(company: any): Observable<any> {
    return this.http.put(`${this.companyUrl}/${company.id}`, company);
  }

}
