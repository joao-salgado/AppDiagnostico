import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { BWHttp } from './bw-http.service';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  private tokensRenokeUrl: string;

  constructor(
    private http: BWHttp,
    private auth: AuthService,
    private router: Router
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  public logout() {
    this.auth.clearAccessToken();
    this.router.navigate(['/login']);
    /*return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.clearAccessToken();
      });*/
  }

}
