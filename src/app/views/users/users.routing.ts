import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { UsersListComponent } from './list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      title: 'Usuários'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
