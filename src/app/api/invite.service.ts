import { BWHttp } from './../core/security/bw-http.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class InviteService {

  private inviteUrl: string;

  constructor(private authHttp: BWHttp, private http: HttpClient) {
    this.inviteUrl = `${environment.apiUrl}/invitations`;
  }

  public save(listEmails: any): Observable<any> {
    return this.authHttp.post(this.inviteUrl, listEmails);
  }

  public findByCompany(id: string, page: number): Observable<any> {

    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', '10');

    return this.authHttp.get(`${this.inviteUrl}/companies/${id}`, {
      params: params
    });
  }

  public findByCode(code: string): Observable<any> {
    return this.http.get(`${this.inviteUrl}/code/${code}`);
  }

  public delete(user: any): Observable<any> {
    return this.authHttp.delete(`${this.inviteUrl}/${user.id}`);
  }

}
