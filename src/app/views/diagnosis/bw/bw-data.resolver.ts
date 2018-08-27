import { AuthService } from './../../../core/security/auth.service';
import { BWService } from './../../../api/bw-questionnaire.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class BWDataResolver implements Resolve<any> {

  constructor(private bwService: BWService,
              private auth: AuthService) {}

  resolve() {
    return this.bwService.findByCompany(this.auth.jwtPayload.company_id);
  }
}
