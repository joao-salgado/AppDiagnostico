import { ErrorHandlerService } from './error-handler.service';
import { ApiModule } from './../api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../api/user.service';
import { UserLoggedService } from './user-logged.service';
import { AuthService } from './security/auth.service';
import { SecurityModule } from './security/security.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { onAppInit } from './app-init.provider';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BWHttp } from './security/bw-http.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SecurityModule,
    ApiModule
  ],
  exports: [
    SecurityModule,
    ApiModule
  ],
  providers: [
    JwtHelperService,
    AuthService,
    UserLoggedService,
    ErrorHandlerService,
    BWHttp,
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
export class CoreModule {

}
