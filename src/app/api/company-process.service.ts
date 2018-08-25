import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable()
export class CompanyProcessService {

  private processUrl: string;

  constructor(private http: HttpClient) {
    this.processUrl = `${environment.apiUrl}/company-processes`;
  }

  public findAll(): Observable<any> {
    return this.http.get(this.processUrl);
  }

}
