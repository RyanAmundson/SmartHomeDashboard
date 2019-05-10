import { Component, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent {
  title = 'SmartHomeDashboard';
  date = Date.now();
  timeObs = timer(1000, 1000);
  dataSource = [];

  @ViewChild("highchart") hiChart;
  @ViewChild("matTable") table;

  constructor(private firebase: AngularFireDatabase) {
    firebase.database.ref('rent').on('value', res => {
      let newData = [];
      Object.entries(res.val().amount).forEach(([k, v]: any) => {
        console.log(k, v)
        newData.push({ who: k, amount_due: v.amount, status: v.amount <= v.paid ? "Paid" : "Unpaid" });
      })
      console.log(this.dataSource)
      this.dataSource = newData;
      this.table.renderRows();
    })
  }

  ngAfterViewInit() {
    console.log(this.hiChart)
  }


  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = {
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: 5,
          style: {
            fontWeight: 'bold',
            color: 'black'
          }
        },
        startAngle: 0,
        endAngle: 0,
      }
    },
    chart: {
      height: '100%',
    },
    title: {
      text: '',
      style: {
        display: 'none'
      }
    },
    subtitle: {
      text: '',
      style: {
        display: 'none'
      }
    },
    yAxis: [{
      max: 200000,
    }],
    series: [
      {
        innerSize: '90%',
        name: 'Rent',
        data: [
          {
            name: 'Ryan',
            y: 300,
          },
          {
            name: 'Elizabeth',
            y: 400,
          },
          {
            name: 'Gary',
            y: 600,
          },
          {
            name: 'Rachael',
            y: 700,
          },
          {
            name: 'Unpaid',
            y: 2500,
            color: '#00000007'
          },
        ],
        type: 'pie',
        stacking: "percent",
        zoneAxis: 'y',
      },
    ]
  };
  chartCallback = function (chart) { } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false

  displayedColumns: string[] = ['who', 'amount_due', 'status'];

}
