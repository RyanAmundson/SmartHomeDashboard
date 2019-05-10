import { Component, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';

const ELEMENT_DATA: any[] = [
  { thisweek: 1, nextweek: 'Hydrogen' },
  { thisweek: 2, nextweek: 'Helium' },
  { thisweek: 3, nextweek: 'Lithium' },
  { thisweek: 4, nextweek: 'Beryllium' },
];

Highcharts.setOptions({
  title: {
    style: {
      display: 'none'
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmartHomeDashboard';
  date = Date.now();
  timeObs = timer(1000, 1000);

  @ViewChild("highchart") hiChart;

  constructor() {

  }

  ngAfterViewInit() {
    console.log(this.hiChart)
  }


  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = {
    title: {
      style: "display:none"
    },
    series: [{
      minPointSize: 1,
      innerSize: '75%',
      zMin: 0,
      name: 'Rent',
      data: [
        {
          name: 'Ryan',
          y: 1250,
          Internet:10,
          Electricity: 10,
          Water: 1000,
        },
        {
          name: 'Elizabeth',
          y: 1075,
        },
        {
          name: 'Gary',
          y: 1075,
        },
        {
          name: 'Rachael',
          y: 1075,
        },
      ],
      type: 'pie',
    }]
  };
  chartCallback = function (chart) { } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false

  displayedColumns: string[] = ['who','this week', 'next week'];
  dataSource = [
    { who: "Ryan", thisweek: "Dishes", nextweek: "Dishes" },
    { who: "Rachael", thisweek: "Dishes", nextweek: "Dishes" },
    { who: "Elizabeth", thisweek: "Dishes", nextweek: "Dishes" },
    { who: "Gary", thisweek: "Dishes", nextweek: "Dishes" },
  ];
}
