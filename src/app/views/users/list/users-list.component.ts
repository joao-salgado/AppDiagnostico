import { UserLoggedService } from './../../../core/user-logged.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: [
    './users-list.component.scss'
  ]
})
export class UsersListComponent implements OnInit {

  public isLoading = false;
  public listUsers: any;
  public user: any;

  constructor(public userLoggedService: UserLoggedService,
              private userService: UserService) {

  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
      this.findUsersByCompany(0);
    });

  }

  public pageChanged(event: any): void {
    this.findUsersByCompany(event.page - 1);
  }

  public toggleUserStatus(user: any): any {
    this.userService.update(user).subscribe(response => {
    }, error => {
      user.active = !user.active;
    });
  }

  private findUsersByCompany(page: number): any {
    this.userService.findByCompany(this.user.company.id, page).subscribe(response => {
      this.listUsers = response;
    });
  }

}
