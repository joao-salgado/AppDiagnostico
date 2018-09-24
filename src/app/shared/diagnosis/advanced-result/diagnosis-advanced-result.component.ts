import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-diagnosis-advanced-result',
  templateUrl: 'diagnosis-advanced-result.component.html',
  styleUrls: [
    './diagnosis-advanced-result.component.scss'
  ]
})
export class DiagnosisAdvancedResultComponent implements OnInit, OnChanges {

  @Input() data: any;

  @ViewChild('barChart') barChart;
  @ViewChild('radarChart') radarChart;
  @ViewChild('lineChart') lineChart;

  public some: any;

  // lineChart
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
  };

  public radarChartOptions: any = {
    scale: {
      ticks: {
        max: 60,
        min: 0
      }
    }
  };

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };

  ngOnChanges(changes: SimpleChanges) {

    setTimeout(() => {
      if (this.barChart !== undefined) {
        this.barChart.ngOnDestroy();
        this.barChart.chart = 0;
        this.barChart.datasets = this.data.bar.data;
        this.barChart.labels = this.data.bar.labels;
        this.barChart.ngOnInit();
      }

      if (this.radarChart !== undefined) {
        this.radarChart.ngOnDestroy();
        this.radarChart.chart = 0;
        this.radarChart.datasets = this.data.radar.data;
        this.radarChart.labels = this.data.radar.labels;
        this.radarChart.ngOnInit();
      }

      if (this.lineChart !== undefined) {
        this.lineChart.ngOnDestroy();
        this.lineChart.chart = 0;
        this.lineChart.datasets = this.data.line.data;
        this.lineChart.labels = this.data.line.labels;
        this.lineChart.ngOnInit();
      }
    });


  }

  ngOnInit(): void {
  }


}
