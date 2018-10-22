import { UserLoggedService } from './../../../core/user-logged.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-diagnosis-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: [
    './landing-page.component.scss'
  ]
})
export class DiagnosisLandingPageComponent implements OnInit, OnDestroy {

  public user: any;
  public btnShow: string;

  @Input() dlpConfig: any;
  @Output() btnListener = new EventEmitter();

  constructor(private userLoggedService: UserLoggedService) {
    document.querySelector('main.main').classList.add('service-main');
  }

  public ngOnInit(): void {
    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });
  }

  public ngOnDestroy(): void {
    document.querySelector('main.main').classList.remove('service-main');
  }

  public btnActionListener(event): void {
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

    let alreadyResponded = false;

    if (this.dlpConfig.data && Array(this.dlpConfig.data.usersWhoResponded) && this.dlpConfig.data.usersWhoResponded.length) {
      alreadyResponded = this.dlpConfig.data.usersWhoResponded.some(user => {
        return user && user.user && user.user.id === this.user.id;
      });
    }

    return !this.userLoggedService.isAdmin() &&
    this.dlpConfig.data &&
    this.dlpConfig.data.questionnaire &&
    this.dlpConfig.data.questionnaire.id &&
    !alreadyResponded;
  }

  public isUserAndHasOpenQuestionnaire(): boolean {

    let alreadyResponded = false;

    if (this.dlpConfig.data && Array(this.dlpConfig.data.usersWhoResponded) && this.dlpConfig.data.usersWhoResponded.length) {
      alreadyResponded = this.dlpConfig.data.usersWhoResponded.some(user => {
        return user && user.user && user.user.id === this.user.id && user.status === 'OPEN';
      });
    }

    return !this.userLoggedService.isAdmin() &&
    this.dlpConfig.data &&
    this.dlpConfig.data.questionnaire &&
    this.dlpConfig.data.questionnaire.id &&
    alreadyResponded;

  }

}
