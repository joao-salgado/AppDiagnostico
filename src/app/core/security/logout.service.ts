import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { BWHttp } from './bw-http.service';

@Injectable()
export class LogoutService {

  private tokensRenokeUrl: string;

  constructor(
    private http: BWHttp,
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
