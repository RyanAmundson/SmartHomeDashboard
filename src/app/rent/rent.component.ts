import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';



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
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent {
  displayedColumns: string[] = ['who', 'amount_due', 'status'];
  Highcharts = Highcharts; // required
  dataSource;
  rent = {
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

  constructor(private firebase: AngularFireDatabase, private ref: ChangeDetectorRef) {
    firebase.database.ref('rent').on('value', res => {
      let newData = [];
      Object.entries(res.val().amount).forEach(([k, v]: any) => {
        this.rent.breakdown.push({ who: k, amount_due: v.amount, status: v.amount <= v.paid ? "Paid" : "Unpaid" });
      })

      
      this.rent.total = res.val().total;
      console.log(this.rent.breakdown.filter((t) => t.who.toLowerCase() == "rachael")[0].amount_due);
      this.chartOptions.series = [
          {
            innerSize: '90%',
            name: 'Rent',
            data: [
              {
                name: 'Ryan',
                y: this.rent.breakdown.filter((t) => t.who.toLowerCase() == "ryan")[0].amount_due,
              },
              {
                name: 'Elizabeth',
                y: this.rent.breakdown.filter((t) => t.who.toLowerCase() == "elizabeth")[0].amount_due,
              },
              {
                name: 'Gary',
                y: this.rent.breakdown.filter((t) => t.who.toLowerCase() == "gary")[0].amount_due,
              },
              {
                name: 'Rachael',
                y: this.rent.breakdown.filter((t) => t.who.toLowerCase() == "rachael")[0].amount_due,
              },
              // {
              //   name: 'Unpaid',
              //   y: 0,
              //   color: '#00000007'
              // },
            ],
            type: 'pie',
            stacking: "percent",
            zoneAxis: 'y',
          },
      ];
      this.updateFlag = true;
      this.dataSource = this.rent.breakdown;
      console.log(this.rent.breakdown)
      this.ref.detectChanges();
    });
  }


  ngAfterViewInit() {
  }




}
