import { StaticJsonService } from '../../../api/static-json.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class BWLandingPageResolver implements Resolve<any> {

  constructor(private staticJsonService: StaticJsonService) {}

  resolve() {
    return this.staticJsonService.getJson('assets/json/diagnosis-landing-page/bw.json');
  }
}
