import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard-bw.component.html'
})
export class DashboardBwComponent implements OnInit {

  public basicData: any;

  public advancedData: any;

  constructor() {

    this.basicData = {
      'sections': [
        {
          'name': 'Obter',
          'totalResult': 60,
          'meta': {
            'answers': [
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3,
              3
            ]
          },
          'section': 1
        },
        {
          'name': 'Utilizar',
          'totalResult': 0,
          'meta': {
            'answers': []
          },
          'section': 2
        },
        {
          'name': 'Aprender',
          'totalResult': 0,
          'meta': {
            'answers': []
          },
          'section': 3
        },
        {
          'name': 'Contribuir',
          'totalResult': 0,
          'meta': {
            'answers': []
          },
          'section': 4
        },
        {
          'name': 'Avaliar',
          'totalResult': 0,
          'meta': {
            'answers': []
          },
          'section': 5
        },
        {
          'name': 'Construir/Manter',
          'totalResult': 0,
          'meta': {
            'answers': []
          },
          'section': 6
        },
        {
          'name': 'Descartar',
          'totalResult': 0,
          'meta': {
            'answers': []
          },
          'section': 7
        }
      ],
      'totalResult': 60
    };

    this.advancedData = {};
  }

  ngOnInit(): void {

  }


}
