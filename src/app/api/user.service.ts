import { BWHttp } from './../core/security/bw-http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class UserService {

  private userUrl: string;

  constructor(private authHttp: BWHttp) {
    this.userUrl = `${environment.apiUrl}/users`;
  }

  public findById(id: string): Promise<any> {
    return this.authHttp.get(`${this.userUrl}/${id}`).toPromise();
  }

}
