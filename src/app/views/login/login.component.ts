import { UserLoggedService } from './../../core/user-logged.service';
import { AuthService } from './../../core/security/auth.service';
import { UserService } from './../../api/user.service';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Login {
  email: string;
  password: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public login: Login;
  public isLoading = false;

  constructor(private auth: AuthService,
              private router: Router,
              private toasty: ToastyService,
              private userService: UserService,
              private userLoggedService: UserLoggedService) {}

  public ngOnInit(): void {

    this.login = new Login();

  }

  public logIn(email: string, password: string): void {
    this.isLoading = true;

    this.auth
      .login(email, password)
      .then(response => {

        this.userService.findById(this.auth.jwtPayload.id).then(userAppSaved => {
          this.userLoggedService.updateUserLogged(userAppSaved);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        });

      })
      .catch(errorObject => {
        this.isLoading = false;
        this.login.password = '';
        this.toasty.error('Usuário ou senha incorretos.');
      });
  }

  public verifyInformations(email: string, password: string): boolean {
    return !email || !password;
  }

}
