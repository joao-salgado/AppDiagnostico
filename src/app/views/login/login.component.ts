import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../core/security/auth.service';
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
  public isLogging = false;

  constructor(private auth: AuthService,
              private router: Router,
              private toasty: ToastyService) {}

  public ngOnInit(): void {

    this.login = new Login();

  }

  public logIn(email: string, password: string): void {
    this.isLogging = true;

    this.auth
      .login(email, password)
      .then(response => {
        this.router.navigate(['/dashboard']);
        this.isLogging = false;
      })
      .catch(errorObject => {
        this.isLogging = false;
        this.login.password = '';
        this.toasty.error('Usuário ou senha incorretos.');
      });
  }

  public verifyInformations(email: string, password: string): boolean {
    return !email || !password;
  }

}
