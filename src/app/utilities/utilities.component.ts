import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent {
  displayedColumns: string[] = ['Utility', "Amount Due", "Amount Paid",  "Paid By", "Due",];
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


  @ViewChild("highchart") hiChart;
  @ViewChild("matTable") table;

  constructor(private firebase: AngularFireDatabase) {
    firebase.database.ref('utilities').on('value', res => {
      this.utility = res.val();
      console.log(this.utility)
      this.table.renderRows();
      this.chartOptions.series = [
          {
            innerSize: '90%',
            name: 'Rent',
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
    });
  }


  ngAfterViewInit() {
    console.log(this.hiChart)
  }




}
