import { environment } from './../../../environments/environment';
import { LogoutService } from './logout.service';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
  ],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SecurityModule { }
