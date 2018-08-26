import { BWResolver } from './bw/bw.resolver';
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
          landingData: BWResolver
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    BWResolver
  ]
})
export class DiagnosisRoutingModule {}
