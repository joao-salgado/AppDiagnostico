import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/security/auth.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P403Component } from './views/error/403.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterCompanyComponent } from './views/register/company/register-company.component';
import { RegisterUserComponent } from './views/register/user/register-user.component';

import { RegisterUserTypesResolver } from './views/register/user/register-user-type.resolver';
import { RegisterUserCodeResolver } from './views/register/user/register-user-code.resolver';
import { RegisterCompanyResolver } from './views/register/company/register-company-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPANY_DASHBOARD']
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '403',
    component: P403Component,
    data: {
      title: 'Page 403'
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
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_USER']
        }
      },
      {
        path: 'perfil',
        loadChildren: './views/profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_COMPANY_DASHBOARD']
        }
      },
      {
        path: 'convites',
        loadChildren: './views/invite/invite.module#InviteModule',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_INVITE']
        }
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
