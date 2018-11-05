import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardBwComponent } from './bw/dashboard-bw.component';
import { DiagnosisListComponent } from '../../shared/diagnosis/list/diagnosis-list.component';
import { ComingSoonComponent } from '../../shared/coming-soon/coming-soon.component';
import { DashboardBWResolver } from './bw/dashboard-bw.resolver';
import { BwRComponent } from './bw-r/bw-r.component';
import { AuthGuard } from '../../core/security/auth.guard';
import { DashboardBWRResolver } from './bw-r/dashboard-bw-r.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: '',
        component: DiagnosisListComponent,
        data: {
          title: ''
        },
      },
      {
        path: 'bw',
        component: DashboardBwComponent,
        data: {
          title: 'Diagnóstico de Gestão de Conhecimento',
          diagnosis: 'bw'
        },
        resolve: {
          data: DashboardBWResolver
        },
      },
      {
        path: 'dgcc',
        component: ComingSoonComponent,
        data: {
          title: 'Diagnóstico Claudia',
          diagnosis: 'dgcc'
        }
      },
      {
        path: 'kmd',
        component: ComingSoonComponent,
        data: {
          title: 'Knowledge Management Diagnostic',
          diagnosis: 'kmd'
        }
      },
      {
        path: 'apo',
        component: ComingSoonComponent,
        data: {
          title: 'Asian Productivity Organization',
          diagnosis: 'apo'
        }
      },
      {
        path: 'oka',
        component: ComingSoonComponent,
        data: {
          title: 'Organizational Knowledge Assessment',
          diagnosis: 'oka'
        }
      },
      {
        path: 'sdkm',
        component: ComingSoonComponent,
        data: {
          title: 'Seven Dimensions of Knowledge Management',
          diagnosis: 'sdkm'
        }
      },
      {
        path: 'bw-r',
        component: BwRComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Diagnóstico de Gestão de Conhecimento',
          diagnosis: 'bw',
          roles: ['ROLE_RESEARCH_DASHBOARD'],
        },
        resolve: {
          data: DashboardBWRResolver
        },
      },
      {
        path: 'dgcc-r',
        component: ComingSoonComponent,
        data: {
          title: 'Diagnóstico Claudia',
          diagnosis: 'dgcc'
        }
      },
      {
        path: 'kmd-r',
        component: ComingSoonComponent,
        data: {
          title: 'Knowledge Management Diagnostic',
          diagnosis: 'kmd'
        }
      },
      {
        path: 'apo-r',
        component: ComingSoonComponent,
        data: {
          title: 'Asian Productivity Organization',
          diagnosis: 'apo'
        }
      },
      {
        path: 'oka-r',
        component: ComingSoonComponent,
        data: {
          title: 'Organizational Knowledge Assessment',
          diagnosis: 'oka'
        }
      },
      {
        path: 'sdkm-r',
        component: ComingSoonComponent,
        data: {
          title: 'Seven Dimensions of Knowledge Management',
          diagnosis: 'sdkm'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    DashboardBWResolver,
    DashboardBWRResolver
  ]
})
export class DashboardRoutingModule {}
