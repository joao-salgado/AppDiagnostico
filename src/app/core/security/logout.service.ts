import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  private tokensRenokeUrl: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  public logout() {

    this.auth.clearAccessToken();
    localStorage.removeItem('selectedCompany');
    this.router.navigate(['/login']);

    /*return this.http.delete(this.tokensRenokeUrl)
      .toPromise()
      .then(() => {
        this.auth.clearAccessToken();
        this.router.navigate(['/login']);
      })
      .catch(() => {
        this.auth.clearAccessToken();
        this.router.navigate(['/login']);
      });*/
  }

}
