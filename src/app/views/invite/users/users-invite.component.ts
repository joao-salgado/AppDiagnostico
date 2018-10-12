import { UserLoggedService } from './../../../core/user-logged.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { InviteService } from './../../../api/invite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-invite',
  templateUrl: 'users-invite.component.html',
  styleUrls: [
    './users-invite.component.scss']
})
export class UsersInviteComponent implements OnInit {

  public loading = false;
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

    this.loading = true;

    this.inviteService.save(this.listSendEmails)
    .subscribe(response => {
      this.listSentEmails.content = this.listSentEmails.content || [];
      this.listSentEmails.content = this.listSentEmails.content.concat(this.inviteSentFactory(response));

      this.listSendEmails = [];
      this.listSendEmails.push(this.inviteFactory());
      this.toasty.success('Convites enviados com sucesso!');
      this.loading = false;
    }, reject => {
      this.toasty.error('Verifique se os emails inseridos estão em formato correto.');
      this.loading = false;
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
        situation: 'SEND',
        id: element.id
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
