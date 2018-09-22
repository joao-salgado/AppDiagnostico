import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardBwComponent } from './bw/dashboard-bw.component';
import { DiagnosisListComponent } from '../../shared/diagnosis/list/diagnosis-list.component';
import { ComingSoonComponent } from '../../shared/coming-soon/coming-soon.component';

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
          title: 'Diagnóstico de Gestão de Conhecimento'
        },
        resolve: {
          /*landingData: BWLandingPageResolver,*/
        },
      },
      {
        path: 'dgcc',
        component: ComingSoonComponent,
        data: {
          title: 'Diagnóstico Claudia'
        }
      },
      {
        path: 'kmd',
        component: ComingSoonComponent,
        data: {
          title: 'Knowledge Management Diagnostic'
        }
      },
      {
        path: 'apo',
        component: ComingSoonComponent,
        data: {
          title: 'Asian Productivity Organization'
        }
      },
      {
        path: 'oka',
        component: ComingSoonComponent,
        data: {
          title: 'Organizational Knowledge Assessment'
        }
      },
      {
        path: 'sdkm',
        component: ComingSoonComponent,
        data: {
          title: 'Seven Dimensions of Knowledge Management'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
