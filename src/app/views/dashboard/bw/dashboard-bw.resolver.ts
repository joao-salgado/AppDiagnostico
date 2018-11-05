import { DashboardService } from '../../../api/dashboard.service';
import { AuthService } from '../../../core/security/auth.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class DashboardBWResolver implements Resolve<any> {

  constructor(private dashboarService: DashboardService,
              private auth: AuthService) {}

  resolve() {
    return this.dashboarService.getByCompany(this.auth.jwtPayload.company_id, 'bw', {});
  }
}
