import { InviteService } from './../../../api/invite.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class RegisterUserCodeResolver implements Resolve<any> {

  constructor(private inviteService: InviteService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {

    if (!!route.queryParams.code) {
      return this.inviteService.findByCode(route.queryParams.code);
    }

    this.router.navigate(['login']);
    return 'login';
  }
}
