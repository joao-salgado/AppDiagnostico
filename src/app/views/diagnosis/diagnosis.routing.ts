import { BWDataResolver } from './bw/bw-data.resolver';
import { BWLandingPageResolver } from './bw/bw-landing-page.resolver';
import { BWComponent } from './bw/bw.component';
import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { ComingSoonComponent } from '../../shared/coming-soon/coming-soon.component';
import { DiagnosisComponent } from './diagnosis.component';
import { DiagnosisListComponent } from '../../shared/diagnosis/list/diagnosis-list.component';

const routes: Routes = [
  {
    path: '',
    component: DiagnosisComponent,
    data: {
      title: 'Diagnósticos'
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
        component: BWComponent,
        data: {
          title: 'Diagnóstico de Gestão de Conhecimento'
        },
        resolve: {
          landingData: BWLandingPageResolver,
          bwData: BWDataResolver
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
  exports: [RouterModule],
  providers: [
    BWLandingPageResolver,
    BWDataResolver
  ]
})
export class DiagnosisRoutingModule {}
