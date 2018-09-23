import { ToastyModule } from 'ng2-toasty';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UsersRoutingModule } from './users.routing';
import { UsersListComponent } from './list/users-list.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ToastyModule,
    UsersRoutingModule,
    NgxMaskModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    UsersListComponent
  ]
})
export class UsersModule { }
