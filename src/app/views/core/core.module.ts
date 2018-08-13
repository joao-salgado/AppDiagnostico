import { AuthService } from './security/auth.service';
import { SecurityModule } from './security/security.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

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
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  declarations: [],
})
export class CoreModule {}
