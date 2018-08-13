import { LogoutService } from './logout.service';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BWHttp } from './bw-http.service';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });

  return new BWHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SecurityModule { }
