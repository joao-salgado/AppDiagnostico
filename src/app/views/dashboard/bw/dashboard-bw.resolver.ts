import { DashboardService } from '../../../api/dashboard.service';
import { AuthService } from '../../../core/security/auth.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class DashboardBWResolver implements Resolve<any> {

  constructor(private dashboarService: DashboardService,
              private auth: AuthService) {}

  resolve() {
    const companyId = localStorage.getItem('selectedCompany');
    if (!!companyId && companyId !== 'null') {
      return this.dashboarService.getByCompany(companyId, 'bw', {});
    }
    return this.dashboarService.getByCompany(this.auth.jwtPayload.company_id, 'bw', {});
  }
}
