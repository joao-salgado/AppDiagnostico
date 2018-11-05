import { DashboardService } from '../../../api/dashboard.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class DashboardBWRResolver implements Resolve<any> {

  constructor(private dashboarService: DashboardService) {}

  resolve() {
    return this.dashboarService.getForRearcher('bw');
  }
}
