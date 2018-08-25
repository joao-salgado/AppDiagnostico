import { ToastyService } from 'ng2-toasty';
import { UserLoggedService } from './../../../core/user-logged.service';
import { AuthService } from './../../../core/security/auth.service';
import { UserService } from './../../../api/user.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountRegister } from '../../../core/model/register';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public userRegister: UserAccountRegister;

  public userData: any;
  public listUserTypes: any;

  public bsConfig: any;
  public bsValue: Date;

  public isLoading = false;

  constructor(private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private userLoggedService: UserLoggedService,
    private toasty: ToastyService) {

    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY',
      maxDate: new Date(),
      minDate: new Date(1930, 0, 1)
    };

    this.localeService.use('pt-br');

  }

  public ngOnInit(): void {

    this.userRegister = new UserAccountRegister();
    this.userRegister.sex = 'MALE';
    this.route.queryParams.subscribe(params => {
      this.userRegister.meta.companyCode = params['code'];
    });

    this.userData = this.route.snapshot.data.userData;

    if (this.userData.situation !== 'SEND') {
      this.toasty.error('Código do convite inválido ou já utilizado');
      this.router.navigate(['/login']);
    }

    this.listUserTypes = this.route.snapshot.data.userTypes;

    this.userRegister.email = this.userData.email;

  }

  public register(userRegister: UserAccountRegister): void {
    this.isLoading = true;

    this.userService.save(userRegister)
    .subscribe(response => {

      this.auth.login(userRegister.email, userRegister.password)
      .then(response2 => {
        this.userService.findById(this.auth.jwtPayload.id).subscribe(userAppSaved => {
          this.userLoggedService.updateUserLogged(userAppSaved);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        });
      });
    }, reject => {
      this.isLoading = false;
      const msg = reject && reject.error[0]
          ? reject.error[0].msgUser
          : 'Houve um erro ao realizar o cadastro, tente novamente mais tarde';
      this.toasty.error(msg);
    });
  }

}
