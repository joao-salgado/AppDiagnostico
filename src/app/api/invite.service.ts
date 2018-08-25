import { BWHttp } from './../core/security/bw-http.service';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InviteService {

  private inviteUrl: string;

  constructor(private http: BWHttp) {
    this.inviteUrl = `${environment.apiUrl}/invitations`;
  }

  public save(listEmails: any): Observable<any> {
    return this.http.post(this.inviteUrl, listEmails);
  }

  public findByCompany(id: string): Observable<any> {
    return this.http.get(`${this.inviteUrl}/companies/${id}`);
  }

}
