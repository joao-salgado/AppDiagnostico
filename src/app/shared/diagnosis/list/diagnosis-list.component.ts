import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from '../../../core/user-logged.service';

@Component({
  templateUrl: 'diagnosis-list.component.html'
})
export class DiagnosisListComponent implements OnInit {

  constructor(public userLoggedService: UserLoggedService,
              private router: Router,
              private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
  }

  public goToDashboard(route) {

    if (!this.userLoggedService.isRearcher()) {
      this.router.navigate([route], { relativeTo: this.activeRoute });
      return;
    }

    const companyId = localStorage.getItem('selectedCompany');
    if (this.userLoggedService.isRearcher() && !!companyId && companyId !== 'null') {
      this.router.navigate([route], { relativeTo: this.activeRoute });
      return;
    }

    this.router.navigate([`${route}-r`], { relativeTo: this.activeRoute });
  }

}
