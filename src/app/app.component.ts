import { Component, ViewChild, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService, PushNotificationOptions } from 'ngx-push-notifications';

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

  readonly VAPID_PUBLIC_KEY = "BL63ZYOy4OKJ2KViKzqlU73veWc2uFw-ISeKIELoRoBxD2AyO-dZrnUUEwHtP8cFK7O1NvuzedqPPsorc5HI3zs";

  @ViewChild("highchart") hiChart;

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

  constructor(private swPush: SwPush, private pushNotificationService: PushNotificationService) {
    if (window.innerWidth < 800) {
      this.updater = true;
    } else {
      this.updater = false;
    }
    this.swPush.notificationClicks.subscribe(data => {
      // handle click
    })
    this.subscribeToNotifications();
  }

  ngOnInit() {
    this.pushNotificationService.requestPermission();
    const isGranted = this.pushNotificationService.isPermissionGranted;
    console.log(isGranted);
    // this.creatNotif();
  }

  loadingComplete() {
    console.log("loading done")
  }

  creatNotif() {
    const title = 'Hello';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';

    this.pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
}

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => console.log(sub))
      .catch(err => console.error("Could not subscribe to notifications", err));
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
