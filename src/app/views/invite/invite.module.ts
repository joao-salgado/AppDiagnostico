import { ToastyModule } from 'ng2-toasty';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InviteRoutingModule } from './invite.routing';
import { UsersInviteComponent } from './users/users-invite.component';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    InviteRoutingModule,
    FormsModule,
    CommonModule,
    ToastyModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    UsersInviteComponent
  ]
})
export class InviteModule { }
