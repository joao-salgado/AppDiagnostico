import { UserLoggedService } from './../../../core/user-logged.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diagnosis-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: [
    './landing-page.component.scss'
  ]
})
export class DiagnosisLandingPageComponent implements OnInit {

  public user: any;

  @Input() dlpConfig: any;

  constructor(private userLoggedService: UserLoggedService) {
  }

  public ngOnInit(): void {
    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });

  }

}
