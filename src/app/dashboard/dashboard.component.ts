import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService, PushNotificationOptions } from 'ngx-push-notifications';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'SmartHomeDashboard';
  date = Date.now();
  timeObs = timer(1000, 1000);
  activeTab = 0;
  key;

  updater = false;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (event.key == "ArrowLeft") {
      this.activeTab--;
    } else if (event.key == "ArrowRight") {
      this.activeTab++;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 800) {
      this.updater = true;
    } else {
      this.updater = false;
    }
  }

  constructor() {
    if (window.innerWidth < 800) {
      this.updater = true;
    } else {
      this.updater = false;
    }
  }

  ngOnInit() {

  }

  loadingComplete() {
    console.log("loading done")
  }

  onKeydown(event) {
    console.log(event.key)
    if (event.key == "39") {
      this.activeTab++;
    } else if (event.key == "37") {
      this.activeTab--;
    }
  }
}
