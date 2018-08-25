import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BWHttp } from '../core/security/bw-http.service';

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
