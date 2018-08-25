import { BWHttp } from './../core/security/bw-http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private userUrl: string;

  constructor(private authHttp: BWHttp) {
    this.userUrl = `${environment.apiUrl}/users`;
  }

  public findById(id: string): Observable<any> {
    return this.authHttp.get(`${this.userUrl}/${id}`);
  }

}
