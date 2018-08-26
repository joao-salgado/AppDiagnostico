import { UserLoggedService } from './../../../core/user-logged.service';
import { AuthService } from './../../../core/security/auth.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { InviteService } from './../../../api/invite.service';
import { CompanyService } from './../../../api/company.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-users-invite',
  templateUrl: 'users-invite.component.html',
  styleUrls: [
    './users-invite.component.scss']
})
export class UsersInviteComponent implements OnInit {

  public isLoading = false;
  public listSendEmails: any;
  public listSentEmails: any;
  public user: any;

  constructor(private userLoggedService: UserLoggedService,
              private inviteService: InviteService,
              private toasty: ToastyService,
              private toastyConfig: ToastyConfig) {

    this.toastyConfig.theme = 'bootstrap';
  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);

     this.findInvitationByCompany(0);

      this.listSendEmails = [
        this.inviteFactory()
      ];
    });

  }

  public addEmail(): void {
    this.listSendEmails.push(this.inviteFactory());
  }

  public send(): void {

    this.inviteService.save(this.listSendEmails)
    .subscribe(response => {
      this.listSentEmails.content = this.listSentEmails.content || [];

      this.listSentEmails.content = this.listSentEmails.content.concat(this.inviteSentFactory(this.listSendEmails));

      this.listSendEmails = [];
      this.listSendEmails.push(this.inviteFactory());
      this.toasty.success('Convites enviados com sucesso!');
    }, reject => {
      this.toasty.error('Verifique se os emails inseridos estão em formato correto.');
    });

  }

  public pageChanged(event: any): void {
    this.findInvitationByCompany(event.page - 1);
  }

  public cancelInvite(user: any): void {

    const situation = user.situation;
    user.situation = 'CANCELED';

    this.inviteService.delete(user).subscribe(response => {
    }, reject => {
      this.toasty.error('Erro ao cancelar convite');
      user.situation = situation;
    });

  }

  private inviteSentFactory(listEmails: any): any {
    return listEmails.map(element => {
      return {
        email: element.email,
        situation: 'SEND'
      };
    });
  }

  private inviteFactory(): any {
    return {
      email: '',
      company: {
        id: this.user.company.id
      }
    };
  }

  private findInvitationByCompany(page: number) {
    this.inviteService.findByCompany(this.user.company.id, page).subscribe(response => {
      this.listSentEmails = response;
    });
  }

}
