import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailsResolver } from './profile-details/profile-details.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ProfileDetailsComponent,
    resolve: {
      user: ProfileDetailsResolver
    },
    data: {
      title: 'Perfil'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ProfileDetailsResolver
  ]
})
export class ProfileRoutingModule {}
