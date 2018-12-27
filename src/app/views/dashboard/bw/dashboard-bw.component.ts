import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  templateUrl: 'dashboard-bw.component.html'
})
export class DashboardBwComponent implements OnInit {
  public basicData: any;
  public advancedData: any;

  constructor(private route: ActivatedRoute) {
    this.prepareData(this.route.snapshot.data.data);
  }

  public ngOnInit(): void {}

  public onbtnSendListener(event: any) {
    this.prepareData(event);
  }

  private prepareData(data: any): void {
    const diagnosisIds = [];
    data.forEach(element => {
      element.bwPersonalSection.sort((a, b) => a.section > b.section ? 0 : -1);
      if (!diagnosisIds.some(id => id === element.diagnosisId)) {
        diagnosisIds.push(element.diagnosisId);
      }
    });

    const organizedData = [];
    diagnosisIds.forEach(element => {
      organizedData.push({ id: element, answers: [] });
    });

    data.forEach(item => {
      organizedData.forEach(value => {
        if (item.diagnosisId === value.id) {
          value.answers.push(item);
        }
      });
    });

    this.prepareBasicData(organizedData);
    this.prepareAdvancedData(organizedData);
  }

  private prepareBasicData(data) {

    this.basicData = {
      sections: [
        {
          name: 'Obter',
          totalResult: 0,
          section: 1
        },
        {
          name: 'Utilizar',
          totalResult: 0,
          section: 2
        },
        {
          name: 'Aprender',
          totalResult: 0,
          section: 3
        },
        {
          name: 'Contribuir',
          totalResult: 0,
          section: 4
        },
        {
          name: 'Avaliar',
          totalResult: 0,
          section: 5
        },
        {
          name: 'Construir/Manter',
          totalResult: 0,
          section: 6
        },
        {
          name: 'Descartar',
          totalResult: 0,
          section: 7
        }
      ],
      totalResult: 0
    };

    if (!data.length) {
      return;
    }

    let answersCount = 0;
    data.forEach(element => {

      element.answers.forEach(answer => {

        answersCount++;

        this.basicData.totalResult += answer.totalPersonalResult;

        answer.bwPersonalSection.forEach((section, index) => {
          this.basicData.sections[index].totalResult += section.totalResult;
        });

      });

    });

    this.basicData.totalResult = (this.basicData.totalResult / answersCount);

    this.basicData.sections.forEach(element => {
      element.totalResult = (element.totalResult / answersCount);
    });

  }

  private prepareAdvancedData(data) {

    this.advancedData = this.advancedData || {};

    // PIE
    const pie = {
      data: this.basicData.sections.map(element => element.totalResult.toFixed(0)),
      labels: this.basicData.sections.map(element => `${element.name}`)
    };

    // BAR
    const barData = [
      {data: [], label: 'Diagnósticos'}
    ];

    data.forEach(element => {
      let answersCount = 0;
      let result = 0;

      element.answers.forEach(answer => {
        answersCount++;
        result += answer.totalPersonalResult;
      });

      barData[0].data.push((result / answersCount).toFixed(0));
    });

    const bar = {
      data: barData,
      labels: data.map(element => moment(element.answers[0].endDate).format('DD-MM-YYYY'))
    };

    // RADAR
    const radarData = [];
    let radarCount = 0;
    data.forEach(element => {
      const item = {data: [0, 0, 0, 0, 0, 0, 0], label: moment(element.answers[0].endDate).format('DD-MM-YYYY')};

      radarCount = 0;
      element.answers.forEach(answer => {
        radarCount++;

        answer.bwPersonalSection.forEach((section, index) => {
          item.data[index] += section.totalResult;
        });
      });

      item.data = item.data.map(value => {
        return value / radarCount;
      });
      radarData.push(item);
    });

    const radar = {
      data: radarData.length ? radarData : [{data: [0, 0, 0, 0, 0, 0, 0], label: 'Não há dados'}],
      labels: ['Obter', 'Utilizar', 'Aprender', 'Contribuir', 'Avaliar', 'Construir/Manter', 'Descartar']
    };

    // OBJECT
    this.advancedData = {
      pie: pie,
      bar: bar,
      radar: radar,
      line: radar
    };
  }
}
