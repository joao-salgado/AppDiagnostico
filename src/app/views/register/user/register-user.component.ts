import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {

    console.log(this.route.snapshot.data.userData);
    console.log(this.route.snapshot.data.userTypes);

    // this.listCompanyProcesses = this.route.snapshot.data.userData;
  }
}
