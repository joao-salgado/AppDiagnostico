import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class InviteService {

  private inviteUrl: string;

  constructor(private http: Http, authHttp: AuthHttp) {
    this.inviteUrl = `${environment.apiUrl}/invitations`;
  }

  public save(listEmails: any): Promise<any> {
    return this.http.post(this.inviteUrl, listEmails)
      .toPromise();
  }

}
