import { CompanyRegister } from './../../../core/model/register';
import { ToastyService } from 'ng2-toasty';
import { UserLoggedService } from './../../../core/user-logged.service';
import { AuthService } from './../../../core/security/auth.service';
import { UserService } from './../../../api/user.service';
import { CompanyService } from './../../../api/company.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-register-company',
  templateUrl: 'register-company.component.html',
  styleUrls: [
    './register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

  public companyRegister: CompanyRegister;
  public isLoading = false;
  public listCompanyProcesses: any;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private router: Router,
              private auth: AuthService,
              private userService: UserService,
              private userLoggedService: UserLoggedService,
              private toasty: ToastyService) {
    this.companyRegister = new CompanyRegister();
  }

  public ngOnInit(): void {
    this.listCompanyProcesses = this.route.snapshot.data.homeData;
  }

  public register(company: CompanyRegister): void {

    this.isLoading = true;

    this.companyService.save(company)
    .subscribe(response => {

      this.auth.login(company.userAccount[0].email, company.userAccount[0].password)
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
