import { UserTypeService } from './../../api/user-type.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot   } from '@angular/router';

@Injectable()
export class RegisterUserTypesResolver implements Resolve<any> {

  constructor(private userTypeService: UserTypeService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userTypeService.findAll();
  }
}
