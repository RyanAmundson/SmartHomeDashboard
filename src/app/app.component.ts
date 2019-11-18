import { Component, ViewChild, HostListener } from "@angular/core";
import * as Highcharts from "highcharts";
import { Observable, timer } from "rxjs";
import { SwPush } from "@angular/service-worker";
import {
  PushNotificationService,
  PushNotificationOptions
} from "ngx-push-notifications";
import { MessagingService } from "./_shared/messaging.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from './_services/utility.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "SmartHomeDashboard";
  date = Date.now();
  timeObs = timer(1000, 1000);
  activeTab = 0;
  key;
  message;

  updater = false;
  
  @ViewChild("highchart") hiChart;

  @HostListener("window:keyup", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (event.key == "ArrowLeft") {
      this.activeTab--;
    } else if (event.key == "ArrowRight") {
      this.activeTab++;
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if(this.utility.isMobileDevice()) {
      this.router.navigate([{ outlets: { home: ['mobile'], utilities: ['mobile'], openIssues: ['mobile'] } }]);
    } else {
      this.router.navigate([{ outlets: { home: ['dashboard'], utilities: ['dashboard'],  openIssues: ['dashboard'] } }]);
    }
  }

  constructor(
    private pushNotificationService: PushNotificationService,
    private messagingService: MessagingService,
    private firebase: AngularFireDatabase,
    private router: Router,
    private utility: UtilityService
  ) {
    if(this.utility.isMobileDevice()) {
      this.router.navigate([{ outlets: { home: ['mobile'], utilities: ['mobile'], openIssues: ['mobile'] }}]);
    } else {
      this.router.navigate([{ outlets: { home: ['dashboard'], utilities: ['dashboard'],  openIssues: ['dashboard'] } }]);
    }
  }

  ngOnInit() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    this.pushNotificationService.requestPermission();
    const isGranted = this.pushNotificationService.isPermissionGranted("granted");
    console.log(this.pushNotificationService.isPermissionGranted, isGranted)
    if(isGranted){
      // this.creatNotif();
    } else {
      console.error("notifications arent allowed@@");
    }
    const userId = this.checkIdentity();
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  checkIdentity(){
    let id = localStorage.getItem('smarthomedashboardID');
    if(!id) {
      let key = this.firebase.database.ref("identities").push({}).key;
      localStorage.setItem('smarthomedashboardID', key);
      id = localStorage.getItem('smarthomedashboardID');
    }
    return id;
  }

  loadingComplete() {
    console.log("loading done");
  }

  creatNotif() {
    const title = "Hello";
    const options = new PushNotificationOptions();
    options.body = "Native Push Notification";

    this.pushNotificationService.create(title, options).subscribe(
      notif => {
        if (notif.event.type === "show") {
          console.log("onshow");
          setTimeout(() => {
            notif.notification.close();
          }, 3000);
        }
        if (notif.event.type === "click") {
          console.log("click");
          notif.notification.close();
        }
        if (notif.event.type === "close") {
          console.log("close");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onKeydown(event) {
    console.log(event.key);
    if (event.key == "39") {
      this.activeTab++;
    } else if (event.key == "37") {
      this.activeTab--;
    }
  }
}
