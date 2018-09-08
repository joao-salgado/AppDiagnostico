import { StaticJsonService } from './../../../api/static-json.service';
import { BWService } from './../../../api/bw-questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { UserLoggedService } from './../../../core/user-logged.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

import swal from 'sweetalert2';

@Component({
  selector: 'app-bw',
  templateUrl: 'bw.component.html',
  styleUrls: [
    './bw.component.scss'
  ],
  animations: [
    trigger('doDiagnosis', [
      state('inactive', style({ transform: 'translateX(0) scale(1)' })),
      state('active', style({ transform: 'translateX(0) scale(1.1)' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', [
        style({ transform: 'translateX(-100%) scale(1)' }),
        animate(100)
      ]),
      transition('inactive => void', [
        animate(100, style({ transform: 'translateX(100%) scale(1)' }))
      ]),
      transition('void => active', [
        style({ transform: 'translateX(0) scale(0)' }),
        animate(200)
      ]),
      transition('active => void', [
        animate(200, style({ transform: 'translateX(0) scale(0)' }))
      ])
    ])
  ]
})
export class BWComponent implements OnInit {

  public user: any;
  public landingData: any;
  public clickType: string;
  public questions: any;
  public loadingQuestions = false;
  public answers: any;
  public objectDiagnosis: any;

  constructor(private userLoggedService: UserLoggedService,
              private toasty: ToastyService,
              private toastyConfig: ToastyConfig,
              private route: ActivatedRoute,
              private bwService: BWService,
              private staticJsonService: StaticJsonService) {

    this.toastyConfig.theme = 'bootstrap';

    this.answers = {
      get: [], use: [], learn: [], contribute: [], evaluate: [], build: [], discard: []
    };

  }

  public ngOnInit(): void {

    this.userLoggedService.currentUserLogged.subscribe((userLogged) => {
      this.user = JSON.parse(userLogged);
    });

    this.landingData = this.route.snapshot.data.landingData;
    this.landingData.data = this.route.snapshot.data.bwData;
  }

  public onBtnClick(event: any): void {

    this.clickType = event;

    switch (event) {
      case 'open':
        this.openDiagnosis();
        break;
      case 'close':
        this.closeDiagnosis();
        break;
      case 'cancel':
        this.cancelDiagnosis();
        break;
      case 'do':
        this.getQuestions();
        break;
    }
  }

  private getQuestions(): void {

    this.loadingQuestions = true;

    this.staticJsonService.getJson('assets/json/diagnosis-sections/bw.json')
    .subscribe(response => {
      this.questions = response;
      this.loadingQuestions = false;
    });

  }

  public doQuestionnaire(): boolean {
    return this.clickType === 'do';
  }

  public onFinalizeTab(): void {
    this.objectDiagnosis = {
      sections: [
        {name: 'Obter'},
        {name: 'Utilizar'},
        {name: 'Aprender'},
        {name: 'Contribuir'},
        {name: 'Avaliar'},
        {name: 'Construir/Manter'},
        {name: 'Descartar'},
      ]
    };

    let index = 0;

    Object.keys(this.answers).forEach(key => {
      const sectionValues = this.answers[key];
      this.objectDiagnosis.sections[index].total_result = sectionValues.reduce((a, b) => a + b, 0);
      this.objectDiagnosis.sections[index].meta = this.objectDiagnosis.sections[index].meta || {};
      this.objectDiagnosis.sections[index].meta.answers = sectionValues;
      index++;
    });

    this.objectDiagnosis.total_result = 0;
    this.objectDiagnosis.sections.forEach(section => {
      this.objectDiagnosis.total_result += section.total_result;
    });

  }

  public onChangeTab(section): void {

    if (this.answers[section.model].length !== 20) {
      section.situation = 'error';
    } else {
      section.situation = 'success';
    }

  }

  public finishDiagnosis(): void {
    console.log(this.objectDiagnosis);
  }

  public hasErrorInDiagnosis(): boolean {
    return this.questions.some(section => {
      return section.situation === 'error';
    });
  }

  public isDiagnosisCompleted(): boolean {
    return this.questions.every(section => {
      return section.situation === 'success';
    });
  }

  private openDiagnosis(): void {
    this.bwService.save(this.user.company.id).subscribe(response => {
      this.landingData.data = this.landingData.data || {};
      this.landingData.data.questionnaire = response;
      this.toasty.success('Questionário iniciado com sucesso');
    }, reject => {
      this.toasty.error('Erro ao iniciar o questionário, tente novamente mais tarde.');
    });
  }

  private closeDiagnosis(): void {

    const that = this;

    swal({
      title: 'Deseja finalizar o questionário?',
      text: 'Ao finalizar o questionário, nenhum outro usuário poderá respondê-lo.',
      type: 'info',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Finalizar',
      cancelButtonText: 'Cancelar'
    }).then(function(answer) {
      if (answer.value) {

        that.bwService.closeDiagnosis(that.landingData.data.questionnaire.id)
        .subscribe(response => {
          that.toasty.success('Diagnóstico finalizado com sucesso.');
          that.landingData.data = that.landingData.data || {};
          that.landingData.data.questionnaire = null;
        }, reject => {
          that.toasty.success('Erro ao finalizar diagnóstico, tente novamente mais tarde.');
        });

      }
    });
  }

  private cancelDiagnosis(): void {

    const that = this;

    swal({
      title: 'Tem certeza?',
      text: 'Deseja realmente cancelar o diagnóstico?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        that.bwService.delete(that.landingData.data.questionnaire.id)
        .subscribe(response => {
          that.toasty.success('Cancelado com sucesso.');
          that.landingData.data = that.landingData.data || {};
          that.landingData.data.questionnaire = null;
        }, reject => {
          that.toasty.success('Erro ao cancelar diagnóstico, tente novamente mais tarde.');
        });
      }
    });
  }

}
