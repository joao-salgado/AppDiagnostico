import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class CompanyProcessService {

  private processUrl: string;

  constructor(private http: Http) {
    this.processUrl = `${environment.apiUrl}/company-processes`;
  }

  public findAll(): Promise<any> {
    return this.http.get(this.processUrl)
      .toPromise()
      .then(response => response.json());
  }

}
