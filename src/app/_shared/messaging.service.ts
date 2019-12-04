import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { mergeMapTo } from "rxjs/operators";
import { take } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
// import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
import { AuthService } from '../_authentication/auth.service';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  messaging;
  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient,
    // private pushNotificationService: PushNotificationService,
    private authService:AuthService
  ) {
    this.angularFireMessaging.messaging.subscribe(_messaging => {
      console.log(_messaging);
      this.messaging = _messaging;
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);

      // // _messaging.onMessage(res => {
      // //   console.log(res);
      // // });
      // console.log("run here")
      // this.messaging.onMessage().subscribe((res) => {
      //   console.log(res)
      // });
      firebase.messaging().onMessage(() => {
        console.log("test foreground")
      })
    });
    //different method
    // Notification.requestPermission().then((permission) => {
    //   if (permission === 'granted') {
    //     console.log('Notification permission granted.');
    //     // TODO(developer): Retrieve an Instance ID token for use with FCM.
    //     // ...
    //   } else {
    //     console.log('Unable to get permission to notify.');
    //   }
    // });
    // this.pushNotificationService.requestPermission();
    // const isGranted = this.pushNotificationService.isPermissionGranted("granted");
    // console.log(this.pushNotificationService.isPermissionGranted, isGranted)
    // if(isGranted){
    //   // this.messagingService.creatNotif();
    // } else {
    //   console.error("notifications arent allowed@@");
    // }
    // const userId = this.authService.checkIdentity();
    // this.requestPermission(userId);
    // this.receiveMessage();
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
      const data = {};
      data[userId] = token;
      this.angularFireDB.object("fcmTokens/").update(data);
    });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        console.log(token);
        this.updateToken(userId, token);
      },
      err => {
        console.error("Unable to get permission to notify.", err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(payload => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
  }


  sendMessageToAZ(message:string) {
    // return this.http.post("https://iot123.azurewebsites.net/api/PushNotifications?code=t23hmvy8lTz4ya0yz9PIc0GIv9cbgcc9cp97RjsIMqWlxlIfYrIpnQ==",{message: message}).subscribe((res) => {
    //   console.log(res)
    // });
  }

  creatNotif() {
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
