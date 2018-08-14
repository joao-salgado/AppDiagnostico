import { LogoutService } from './../../core/security/logout.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(private logoutService: LogoutService,
              private router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }


  public logout(): void {
    this.logoutService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
