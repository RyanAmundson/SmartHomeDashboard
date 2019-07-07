import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ReturnStatement } from '@angular/compiler';

Highcharts.setOptions({
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
}); 

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent {
  displayedColumns: string[] = ['utility', "amount_due", "period", "paid_by", "due"];
  Highcharts = Highcharts; // required

  utility = {
    total: 0,
    breakdown: [
    ]
  };

  chartOptions = {
    series: [
    ]
  }
  
  updateFlag = false;
  oneToOneFlag = true;
  dataSource;

  @ViewChild("highchart") hiChart;
  @ViewChild("matTable") table;

  constructor(private firebase: AngularFireDatabase) {
    firebase.database.ref('utilities').on('value', res => {
      Object.entries(res.val().breakdown).forEach(([k, v]: any) => {
        this.utility.breakdown.push({ amount_due: v.amount_due, period: v.period, paid_by:v.paid_by, due: v.due, utility: v.utility });
      })

      // this.table.renderRows();
      this.chartOptions.series = [
          {
            innerSize: '90%',
            name: '',
            data: this.utility.breakdown.map((entry) => {
              return { 
                name:entry.utility,
                y: entry.amount_due
              }
            }),
            type: 'pie',
            stacking: "percent",
            zoneAxis: 'y',
          },
      ];
      this.updateFlag = true;
      this.dataSource = this.utility.breakdown;
    });
  }


  ngAfterViewInit() {
    console.log(this.hiChart)
  }




}
