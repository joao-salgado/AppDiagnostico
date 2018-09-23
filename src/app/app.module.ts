import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomHttpInterceptor } from './api/http-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { DiagnosisModule } from './views/diagnosis/diagnosis.module';
import { ProfileModule } from './views/profile/profile.module';
import { RegisterUserComponent } from './views/register/user/register-user.component';
import { CoreModule } from './core/core.module';
import { InviteModule } from './views/invite/invite.module';
import { RegisterCompanyComponent } from './views/register/company/register-company.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxMaskModule } from 'ngx-mask';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToastyModule } from 'ng2-toasty';
import { HttpModule } from '@angular/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UsersModule } from './views/users/users.module';
registerLocaleData(ptBr);

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ToastyModule.forRoot(),
    NgxMaskModule.forRoot(),
    SweetAlert2Module.forRoot(),
    FormsModule,
    CoreModule,
    ChartsModule,
    SharedModule,
    InviteModule,
    ProfileModule,
    DiagnosisModule,
    UsersModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterCompanyComponent,
    RegisterUserComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
