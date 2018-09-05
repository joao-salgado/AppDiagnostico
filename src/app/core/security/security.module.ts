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
        tokenGetter: tokenGetter
      }
    }),
  ],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SecurityModule { }
