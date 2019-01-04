import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../../api/company.service';
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
  public companies: Array<any>;
  public selectedCompany: any;
  public researcherCompanyId: string;

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public user: any;

  constructor(private logoutService: LogoutService,
              public auth: AuthService,
              public userLoggedService: UserLoggedService,
              private companyService: CompanyService,
              private router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.navItems = userLoggedService.isRearcher() ? navItems.filter(item => !item.notRearcher) : navItems;

    if (userLoggedService.isRearcher()) {
      this.companyService.getAll()
      .subscribe(response => {
        this.companies = response;
        this.selectedCompany = response.find(company => company.name === 'Pesquisadores');
        this.selectedCompany = this.researcherCompanyId = this.selectedCompany.id;
      });
    }

  }

  public ngOnInit(): void {
    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });
  }

  public logout(): void {
    this.logoutService.logout();
  }

  public onSelectCompany(companyId): void {

    companyId === this.researcherCompanyId
                  ? localStorage.setItem('selectedCompany', null)
                  : localStorage.setItem('selectedCompany', companyId);

    if (this.router.url.includes('dashboard') && this.router.url.length > 9) {
      this.router.navigate(['/dashboard']);
    }
  }

}
