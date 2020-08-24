import { Component, OnInit, Input } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
// import {
// PushNotificationOptions,
// PushNotificationService
// } from "ngx-push-notifications";
import { CssColorStrings } from "src/app/_models/models";
import { MessagingService } from "../messaging.service";

@Component({
  selector: "app-status-widget",
  templateUrl: "./status-widget.component.html",
  styleUrls: ["./status-widget.component.scss"]
})
export class StatusWidgetComponent implements OnInit {
  @Input() fbRef: string;
  @Input() title: string;
  @Input() items;
  @Input() statuses = ["success", "warning", "danger"];

  list;

  constructor(
    private firebase: AngularFireDatabase,
    // private pushNotificationService: PushNotificationService,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    this.firebase
      .list(this.fbRef)
      .snapshotChanges()
      .pipe(
        map(changes => {
          changes.map(c => {
            let values = c.payload.val();
            return { key: c.payload.key, ...values as Array<any> }
          })
        })
      )
      .subscribe(list => {
        this.list = list;
        console.log(this.list);
        this.items = list;
      });
  }

  updateStatus(item) {
    let newStatus = item.status;
    if (item.status == CssColorStrings.green) {
      newStatus = CssColorStrings.yellow;
    } else if (item.status == CssColorStrings.yellow) {
      newStatus = CssColorStrings.red;
    } else if (item.status == CssColorStrings.red) {
      newStatus = CssColorStrings.green;
    }
    this.firebase
      .object(this.fbRef + "/" + item.key + "/status")
      .set(newStatus)
      .then(res => {
        console.log(res, "status udpdated for: " + item.key);
      })
      .then(() => {
        // this.messagingService.sendMessageToAZ(
        //   item.key + " status changed to " + newStatus
        // );
      });
  }

  ngOnDestroy() {
    // const title = "Hello";
    // const options = new PushNotificationOptions();
    // options.body = "Native Push Notification";

    // this.pushNotificationService.create(title, options).subscribe(
    //   notif => {
    //     if (notif.event.type === "show") {
    //       console.log("onshow");
    //       setTimeout(() => {
    //         notif.notification.close();
    //       }, 3000);
    //     }
    //     if (notif.event.type === "click") {
    //       console.log("click");
    //       notif.notification.close();
    //     }
    //     if (notif.event.type === "close") {
    //       console.log("close");
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }
}
