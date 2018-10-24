import { StaticJsonService } from './../../../api/static-json.service';
import { BWService } from './../../../api/bw-questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { UserLoggedService } from './../../../core/user-logged.service';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  state
} from '@angular/animations';

import swal from 'sweetalert2';

@Component({
  selector: 'app-bw',
  templateUrl: 'bw.component.html',
  styleUrls: ['./bw.component.scss'],
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
  public answers: any;
  public objectDiagnosis: any;

  public loadingFinish = false;
  public loadingData = false;
  public loadingQuestions = false;

  public diagnosis: any;

  constructor(
    private userLoggedService: UserLoggedService,
    private toasty: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private bwService: BWService,
    private staticJsonService: StaticJsonService
  ) {
    this.toastyConfig.theme = 'bootstrap';

    this.answers = {
      get: [],
      use: [],
      learn: [],
      contribute: [],
      evaluate: [],
      build: [],
      discard: []
    };

    this.objectDiagnosis = {
      sections: [
        { name: 'Obter', totalResult: 0, section: 1, meta: { answers: [] } },
        { name: 'Utilizar', totalResult: 0, section: 2, meta: { answers: [] } },
        { name: 'Aprender', totalResult: 0, section: 3, meta: { answers: [] } },
        {
          name: 'Contribuir',
          totalResult: 0,
          section: 4,
          meta: { answers: [] }
        },
        { name: 'Avaliar', totalResult: 0, section: 5, meta: { answers: [] } },
        {
          name: 'Construir/Manter',
          totalResult: 0,
          section: 6,
          meta: { answers: [] }
        },
        { name: 'Descartar', totalResult: 0, section: 7, meta: { answers: [] } }
      ]
    };
  }

  public ngOnInit(): void {
    this.userLoggedService.currentUserLogged.subscribe(userLogged => {
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
        this.initQuestions();
        break;
      case 'continue':
        this.continueDiagnosis();
        break;
    }
  }

  private continueDiagnosis(): void {
    this.clickType = 'continue';

    this.loadingQuestions = true;
    this.loadingData = true;

    this.staticJsonService
      .getJson('assets/json/diagnosis-sections/bw.json')
      .subscribe(response => {
        this.questions = response;
        this.loadingQuestions = false;
      });

    this.bwService.findByUserId(this.user.id).subscribe(response => {
      this.diagnosis = response;

      this.answers = {
        get: [],
        use: [],
        learn: [],
        contribute: [],
        evaluate: [],
        build: [],
        discard: []
      };

      this.diagnosis.bwPersonalSection.forEach(element => {
        switch (element.section) {
          case 1:
            this.answers.get = element.meta.answers;
            break;
          case 2:
            this.answers.use = element.meta.answers;
            break;
          case 3:
            this.answers.learn = element.meta.answers;
            break;
          case 4:
            this.answers.contribute = element.meta.answers;
            break;
          case 5:
            this.answers.evaluate = element.meta.answers;
            break;
          case 6:
            this.answers.build = element.meta.answers;
            break;
          case 7:
            this.answers.discard = element.meta.answers;
            break;
        }
      });

      this.loadingData = false;
    });
  }

  private initQuestions(): void {
    this.loadingQuestions = true;
    this.loadingData = true;

    this.staticJsonService
      .getJson('assets/json/diagnosis-sections/bw.json')
      .subscribe(response => {
        this.questions = response;
        this.loadingQuestions = false;
      });

    const questionnaireId = this.landingData.data.questionnaire.id;
    let bwPersonal: any;
    bwPersonal = {};

    bwPersonal.totalResult = 0;
    bwPersonal.bwPersonalSection = this.objectDiagnosis.sections;
    bwPersonal.user = { id: this.user.id };
    bwPersonal.bwQuestionnaire = { id: questionnaireId };
    bwPersonal.status = 'OPEN';

    this.bwService.savePersonalDiagnosis(questionnaireId, bwPersonal).subscribe(
      response => {
        this.diagnosis = response;
        this.loadingData = false;
      },
      reject => {
        this.toasty.error(
          'Erro ao iniciar o questionário, tente novamente mais tarde.'
        );
        this.loadingData = false;
      }
    );
  }

  public doQuestionnaire(): boolean {
    return this.clickType === 'do' || this.clickType === 'continue';
  }

  public onChangeTab(section): void {
    if (this.answers[section.model].length !== 20) {
      section.situation = 'error';
    } else {
      section.situation = 'success';
    }

    let index = 0;

    Object.keys(this.answers).forEach(key => {
      const sectionValues = this.answers[key];
      this.objectDiagnosis.sections[index].totalResult = sectionValues.reduce(
        (a, b) => a + b,
        0
      );
      this.objectDiagnosis.sections[index].meta =
        this.objectDiagnosis.sections[index].meta || {};
      this.objectDiagnosis.sections[index].meta.answers = sectionValues;
      this.objectDiagnosis.sections[index].section = index + 1;
      index++;
    });

    this.objectDiagnosis.totalResult = 0;
    this.objectDiagnosis.sections.forEach(sectionAns => {
      this.objectDiagnosis.totalResult += sectionAns.totalResult;
    });

    const questionnaireId = this.landingData.data.questionnaire.id;
    let bwPersonal: any;
    bwPersonal = {};

    bwPersonal.totalResult = this.objectDiagnosis.totalResult;
    bwPersonal.bwPersonalSection = this.objectDiagnosis.sections;
    bwPersonal.user = { id: this.user.id };
    bwPersonal.bwQuestionnaire = { id: questionnaireId };
    bwPersonal.status = 'OPEN';
    bwPersonal.id = this.diagnosis.id;

    bwPersonal.bwPersonalSection.forEach((sec, ind) => {
      sec.id = this.diagnosis.bwPersonalSection[ind].id;
    });

    this.bwService
      .updatePersonalDiagnosis(questionnaireId, bwPersonal)
      .subscribe();
  }

  public finishDiagnosis(): void {
    this.loadingFinish = true;

    const questionnaireId = this.landingData.data.questionnaire.id;
    let bwPersonal: any;
    bwPersonal = {};

    bwPersonal.totalResult = this.objectDiagnosis.totalResult;
    bwPersonal.bwPersonalSection = this.objectDiagnosis.sections;
    bwPersonal.user = { id: this.user.id };
    bwPersonal.bwQuestionnaire = { id: questionnaireId };
    bwPersonal.status = 'CLOSED';
    bwPersonal.id = this.diagnosis.id;

    this.bwService
      .updatePersonalDiagnosis(questionnaireId, bwPersonal)
      .subscribe(
        response => {
          this.clickType = '';
          this.toasty.success('Questionário finalizado com sucesso.');
          this.loadingFinish = false;
          this.landingData.data.questionnaireId = this.landingData.data.questionnaire.id;
          this.landingData.data.questionnaire = null;
          this.landingData.data.alreadyResponded = true;
        },
        reject => {
          this.toasty.error(
            'Erro ao finalizar o questionário, tente novamente mais tarde.'
          );
          this.loadingFinish = false;
        }
      );
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
    this.bwService.save(this.user.company.id).subscribe(
      response => {
        this.landingData.data = this.landingData.data || {};
        this.landingData.data.questionnaire = response;
        this.toasty.success('Questionário iniciado com sucesso');
        this.landingData.manualOpen = true;
      },
      reject => {
        this.toasty.error(
          'Erro ao iniciar o questionário, tente novamente mais tarde.'
        );
      }
    );
  }

  private closeDiagnosis(): void {
    const that = this;

    const id = this.landingData.data.questionnaire ? this.landingData.data.questionnaire.id : this.landingData.data.questionnaireId;

    swal({
      title: 'Deseja finalizar o questionário?',
      text:
        'Ao finalizar o questionário, nenhum outro usuário poderá respondê-lo.',
      type: 'info',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Finalizar',
      cancelButtonText: 'Cancelar'
    }).then(function(answer) {
      if (answer.value) {
        that.bwService
          .closeDiagnosis(id)
          .subscribe(
            response => {
              that.toasty.success('Diagnóstico finalizado com sucesso.');
              that.landingData.data = that.landingData.data || {};
              that.landingData.data.questionnaire = null;
              that.landingData.data.questionnaireId = null;
            },
            reject => {
              that.toasty.success(
                'Erro ao finalizar diagnóstico, tente novamente mais tarde.'
              );
            }
          );
      }
    });
  }

  private cancelDiagnosis(): void {
    const that = this;
    const id = this.landingData.data.questionnaire ? this.landingData.data.questionnaire.id : this.landingData.data.questionnaireId;

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
    }).then(result => {
      if (result.value) {
        that.bwService.delete(id).subscribe(
          response => {
            that.toasty.success('Cancelado com sucesso.');
            that.landingData.data = that.landingData.data || {};
            that.landingData.data.questionnaire = null;
            that.landingData.data.questionnaireId = null;
          },
          reject => {
            that.toasty.success(
              'Erro ao cancelar diagnóstico, tente novamente mais tarde.'
            );
          }
        );
      }
    });
  }
}
