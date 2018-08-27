import { BWDataResolver } from './bw/bw-data.resolver';
import { BWLandingPageResolver } from './bw/bw-landing-page.resolver';
import { BWComponent } from './bw/bw.component';
import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Diagnósticos'
    },
    children: [
      {
        path: 'bw',
        component: BWComponent,
        data: {
          title: 'Bukowitz & Williams'
        },
        resolve: {
          landingData: BWLandingPageResolver,
          bwData: BWDataResolver
        },
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
