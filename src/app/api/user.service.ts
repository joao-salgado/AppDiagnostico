import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class UserService {

  private userUrl: string;

  constructor(private authHttp: AuthHttp) {
    this.userUrl = `${environment.apiUrl}/users`;
  }

  public findById(id: string): Promise<any> {
    return this.authHttp.get(`${this.userUrl}/${id}`)
      .toPromise()
      .then(response => response.json());
  }

}
