import { Component, HostListener } from "@angular/core";
// import { PushNotificationService } from "ngx-push-notifications";
import { MessagingService } from "./_shared/messaging.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";
import { UtilityService } from "./_services/utility.service";

import { MDCTopAppBar } from "@material/top-app-bar";
import { AuthService } from "./_authentication/auth.service";
import { Platform } from "@angular/cdk/platform";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isMobile = this.utility.isMobileDevice();
  signedIn = false;

  constructor(
    private utility: UtilityService,
    private platform: Platform,
    private router: Router,
    public authService: AuthService
  ) {

  }
}
