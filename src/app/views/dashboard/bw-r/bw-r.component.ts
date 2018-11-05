import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bw-r',
  templateUrl: './bw-r.component.html',
  styleUrls: ['./bw-r.component.scss']
})
export class BwRComponent implements OnInit {
  public basicResult = null;
  public barChartData;
  public data;
  public barChartType = 'obter';

  @ViewChild('barChart')
  barChart;

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {
    this.data = this.route.snapshot.data.data;

    this.basicResult = [
      {
        label: 'Quantidade de empresas cadastradas',
        result: this.data.companyCount
      },
      {
        label: 'Quantidade de empresas que concluíram o questionário',
        result: this.data.companyConcluedCount
      },
      {
        label: 'Quantidade de empresas que cancelaram o questionário',
        result: this.data.companyCanceledCount
      },
      {
        label: 'Quantidade de questionários abertos',
        result: this.data.questionnairesOpenCount
      },
      {
        label: 'Quantidade de questionários concluídos',
        result: this.data.questionnairesConcluedCount
      },
      {
        label: 'Quantidade de questionários cancelados',
        result: this.data.questionnairesCanceledCount
      },
      {
        label: 'Quantidade de usuários cadastrados',
        result: this.data.usersCount
      },
      {
        label: 'Media de usuários por empresa',
        result: this.data.usersByCompany
      }
    ];

    this.onChangeData();
  }

  public ngOnInit() {}

  public onChangeData(): void {

    // BAR
    const barData = [
      {data: [], label: 'Diagnósticos'}
    ];

    switch (this.barChartType) {
      case 'obter':
        barData[0].data = this.data.byProcess.map(element => element.get ? element.get.toFixed(0) : 0);
        break;
      case 'utilizar':
        barData[0].data = this.data.byProcess.map(element => element.learn ? element.learn.toFixed(0) : 0);
        break;
      case 'aprender':
        barData[0].data = this.data.byProcess.map(element => element.learn ? element.learn.toFixed(0) : 0);
        break;
      case 'contribuir':
        barData[0].data = this.data.byProcess.map(element => element.contribute ? element.contribute.toFixed(0) : 0);
        break;
      case 'avaliar':
        barData[0].data = this.data.byProcess.map(element => element.evaluate ? element.evaluate.toFixed(0) : 0);
        break;
      case 'construir':
        barData[0].data = this.data.byProcess.map(element => element.build ? element.build.toFixed(0) : 0);
        break;
      case 'descartar':
        barData[0].data = this.data.byProcess.map(element => element.discard ? element.discard.toFixed(0) : 0);
        break;
      case 'quantidade':
        barData[0].data = this.data.byProcess.map(element => element.count ? element.count.toFixed(0) : 0);
        break;
      case 'total':
        barData[0].data = this.data.byProcess.map(element => element.total ? element.total.toFixed(0) : 0);
        break;
    }

    const bar = {
      data: barData,
      labels: this.data.byProcess.map(element => element.name)
    };

    setTimeout(() => {
      if (this.barChart !== undefined) {
        this.barChart.ngOnDestroy();
        this.barChart.chart = 0;
        this.barChart.datasets = bar.data;
        this.barChart.labels = bar.labels;
        this.barChart.ngOnInit();
      }
    });
  }
}
