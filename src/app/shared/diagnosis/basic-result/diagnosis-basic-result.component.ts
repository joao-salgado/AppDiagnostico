import { UserLoggedService } from './../../../core/user-logged.service';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diagnosis-basic-result',
  templateUrl: 'diagnosis-basic-result.component.html',
  styleUrls: [
    './diagnosis-basic-result.component.scss'
  ]
})
export class DiagnosisBasicResultComponent implements OnInit {

  public user: any;

  @Input() data: any;

  constructor(private userLoggedService: UserLoggedService,
              private toasty: ToastyService,
              ) {

  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });

    console.log(this.data);
  }

}
