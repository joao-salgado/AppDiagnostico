import { UserLoggedService } from './../../core/user-logged.service';
import { AuthService } from './../../core/security/auth.service';
import { LogoutService } from './../../core/security/logout.service';
import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public navItems;

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public user: any;

  constructor(private logoutService: LogoutService,
              public auth: AuthService,
              private userLoggedService: UserLoggedService,
              ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.navItems = userLoggedService.isRearcher() ? navItems.filter(item => !item.notRearcher) : navItems;
  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });

  }

  public logout(): void {
    this.logoutService.logout();
  }

}
