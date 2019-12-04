import { Component, ViewChild, Input } from '@angular/core';
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
  selector: 'pie-and-table',
  templateUrl: './pie-and-table.component.html',
  styleUrls: ['./pie-and-table.component.scss']
})
export class PieAndTableComponent {
  @Input() displayedColumns: string[] = ['c1', 'c1', 'c3'];
  @Input() dataSource = [];
  @Input() chartOptions;
  Highcharts = Highcharts; // required
  updateFlag = false;
  oneToOneFlag = true;


  @ViewChild("highchart", {static:false}) hiChart;
  @ViewChild("matTable", {static:false}) table;

  constructor(private firebase: AngularFireDatabase) {
  }
  
  ngOnChanges() {
    console.log(this.dataSource)
    if(this.table.renderRows && this.dataSource){
      // this.table.renderRows();
    }

  }

  ngAfterViewInit() {
  }




}
