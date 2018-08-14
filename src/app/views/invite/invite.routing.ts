import { UsersInviteComponent } from './users/users-invite.component';
import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsersInviteComponent,
    data: {
      title: 'convites'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteRoutingModule {}
