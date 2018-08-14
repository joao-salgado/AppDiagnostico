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
  public user: any;

  constructor(private companyService: CompanyService,
              private router: Router,
              private auth: AuthService,
              private userLoggedService: UserLoggedService,
              private inviteService: InviteService,
              private toasty: ToastyService,
              private toastyConfig: ToastyConfig) {

    this.toastyConfig.theme = 'bootstrap';
  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);

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
    .then(response => {
      this.listSendEmails = [];
      this.listSendEmails.push(this.inviteFactory());
      this.toasty.success('Convites enviados com sucesso!');
    })
    .catch(reject => {
      this.toasty.error('Verifique se os emails inseridos estão em formato correto.');
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


}
