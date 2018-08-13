import { environment } from './../../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  public logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.clearAccessToken();
      });
  }

}
