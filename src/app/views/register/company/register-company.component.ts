import { CompanyRegister } from './../../../core/model/register';
import { ToastyService } from 'ng2-toasty';
import { UserLoggedService } from './../../../core/user-logged.service';
import { AuthService } from './../../../core/security/auth.service';
import { UserService } from './../../../api/user.service';
import { CompanyService } from './../../../api/company.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

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
  public listUserTypes: any;
  public bsConfig: any;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private router: Router,
              private auth: AuthService,
              private userService: UserService,
              private userLoggedService: UserLoggedService,
              private localeService: BsLocaleService) {
    this.companyRegister = new CompanyRegister();

    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY',
      maxDate: new Date(),
      minDate: new Date(1930, 0, 1)
    };

    this.localeService.use('pt-br');
  }

  public ngOnInit(): void {
    this.listCompanyProcesses = this.route.snapshot.data.homeData;
    this.listUserTypes = this.route.snapshot.data.userTypes;
    this.listUserTypes.shift();
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
    });

  }

}
