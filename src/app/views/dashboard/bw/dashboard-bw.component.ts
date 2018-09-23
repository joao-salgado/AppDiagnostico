import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'dashboard-bw.component.html'
})
export class DashboardBwComponent implements OnInit {
  public basicData: any;
  public advancedData: any;

  constructor(private route: ActivatedRoute) {
    this.prepareData(this.route.snapshot.data.data);
  }

  ngOnInit(): void {}

  public onbtnSendListener(event: any) {
    this.prepareData(event);
  }

  private prepareData(data: any): void {
    const diagnosisIds = [];
    data.forEach(element => {
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

    console.log(this.basicData);

  }

  private prepareAdvancedData(data) {this.advancedData = {}; }
}
