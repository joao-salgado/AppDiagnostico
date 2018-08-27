import { UserLoggedService } from './../../../core/user-logged.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-diagnosis-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: [
    './landing-page.component.scss'
  ]
})
export class DiagnosisLandingPageComponent implements OnInit {

  public user: any;
  public btnShow: string;

  @Input() dlpConfig: any;
  @Output() btnListener = new EventEmitter();

  constructor(private userLoggedService: UserLoggedService) {
  }

  public ngOnInit(): void {
    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });
  }

  public btnActionListener(event): void {
    console.log(event);
    this.btnShow = event;
    this.btnListener.emit(event);
  }

  public isAdminAndHasNotQuestionnaire(): boolean {

    return this.btnShow === 'open'
    ? false
    : this.userLoggedService.isAdmin() && (
    !this.dlpConfig.data ||
    !this.dlpConfig.data.questionnaire ||
    !this.dlpConfig.data.questionnaire.id);

  }

  public isAdminAndHasQuestionnaire(): boolean {
    return (this.userLoggedService.isAdmin() &&
    this.dlpConfig.data &&
    this.dlpConfig.data.questionnaire &&
    this.dlpConfig.data.questionnaire.id)
    || this.btnShow === 'open';
  }

  public isUserAndHasQuestionnaire(): boolean {
    return !this.userLoggedService.isAdmin() &&
    this.dlpConfig.data &&
    this.dlpConfig.data.questionnaire &&
    this.dlpConfig.data.questionnaire.id;
  }

}