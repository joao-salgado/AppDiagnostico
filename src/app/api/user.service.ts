import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BWHttp } from '../core/security/bw-http.service';

@Injectable()
export class UserService {

  private userUrl: string;

  constructor(private authHttp: BWHttp, private http: HttpClient) {
    this.userUrl = `${environment.apiUrl}/users`;
  }

  public findById(id: string): Observable<any> {
    return this.authHttp.get(`${this.userUrl}/${id}`);
  }

  public findByCompany(companyId: string, page: number): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', '10');

    return this.authHttp.get(`${this.userUrl}/companies/${companyId}`, {
      params: params
    });
  }

  public save(user: any): Observable<any> {
    return this.http.post(this.userUrl, user);
  }

  public update(user: any): Observable<any> {
    return this.authHttp.put(`${this.userUrl}/${user.id}`, user);
  }

}
