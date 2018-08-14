import { UserService } from './../api/user.service';
import { UserLoggedService } from './user-logged.service';
import { AuthService } from './security/auth.service';
import { SecurityModule } from './security/security.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { onAppInit } from './app-init.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SecurityModule
  ],
  exports: [
    SecurityModule
  ],
  providers: [
    JwtHelper,
    AuthService,
    UserLoggedService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      multi: true,
      deps: [AuthService, UserService, UserLoggedService]
    },
  ],
  declarations: [],
})
export class CoreModule {}
