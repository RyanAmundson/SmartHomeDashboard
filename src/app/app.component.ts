import { Component, ViewChild, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmartHomeDashboard';
  date = Date.now();
  timeObs = timer(1000, 1000);
  activeTab = 0;
  key;

  updater = false;
  @ViewChild("highchart") hiChart;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(event.key)
    if (event.key == "ArrowLeft") {
      this.activeTab--;
    } else if (event.key == "ArrowRight") {
      this.activeTab++;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth < 800) {
      this.updater = true;
    } else {
      this.updater = false;
    }
  }

  constructor() {
    if(window.innerWidth < 800) {
      this.updater = true;
    } else {
      this.updater = false;
    }
  }

  ngAfterViewInit() {
    console.log(this.hiChart)
  }
  onKeydown(event) {
    console.log(event.key)
    if (event.key == "39") {
      // this.activeTab++;
    } else if (event.key == "37") {
      // this.activeTab--;
    }
  }
}
