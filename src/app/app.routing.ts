import { RegisterUserTypesResolver } from './views/register/user/register-user-type.resolver';
import { RegisterUserCodeResolver } from './views/register/user/register-user-code.resolver';
import { RegisterUserComponent } from './views/register/user/register-user.component';
import { AuthGuard } from './core/security/auth.guard';
import { RegisterCompanyResolver } from './views/register/company/register-company-resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterCompanyComponent } from './views/register/company/register-company.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Página de login'
    }
  },
  {
    path: 'cadastro-empresa',
    component: RegisterCompanyComponent,
    data: {
      title: 'Cadastro de empresa'
    },
    resolve: {
      homeData: RegisterCompanyResolver
    },
  },
  {
    path: 'cadastro-usuario',
    component: RegisterUserComponent,
    data: {
      title: 'Cadastro de usuario'
    },
    resolve: {
      userData: RegisterUserCodeResolver,
      userTypes: RegisterUserTypesResolver
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'diagnosticos',
        loadChildren: './views/diagnosis/diagnosis.module#DiagnosisModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'usuarios',
        loadChildren: './views/users/users.module#UsersModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'perfil',
        loadChildren: './views/profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'convites',
        loadChildren: './views/invite/invite.module#InviteModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule',
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: '/404' },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    RegisterCompanyResolver,
    RegisterUserCodeResolver,
    RegisterUserTypesResolver
  ]
})
export class AppRoutingModule {}
