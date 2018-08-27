import { BWService } from './../../../api/bw-questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { UserLoggedService } from './../../../core/user-logged.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bw',
  templateUrl: 'bw.component.html',
  styleUrls: [
    './bw.component.scss'
  ]
})
export class BWComponent implements OnInit {

  public user: any;
  public landingData: any;

  constructor(private userLoggedService: UserLoggedService,
              private toasty: ToastyService,
              private toastyConfig: ToastyConfig,
              private route: ActivatedRoute,
              private bwService: BWService) {

    this.toastyConfig.theme = 'bootstrap';
  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });

    this.landingData = this.route.snapshot.data.landingData;
    this.landingData.data = this.route.snapshot.data.bwData;
  }

  public onBtnClick(event: any): void {

    switch (event) {
      case 'open':
        this.bwService.save(this.user.company.id).subscribe(response => {
          this.toasty.success('Questionário iniciado com sucesso');
        }, reject => {
          this.toasty.error('Erro ao iniciar o questionário, tente novamente mais tarde.');
        });
        break;
      case 'close':

        break;
      case 'do':

        break;
    }
  }
}
