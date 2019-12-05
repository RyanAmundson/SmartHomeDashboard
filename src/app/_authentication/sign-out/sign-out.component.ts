import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "shd-sign-out",
  templateUrl: "./sign-out.component.html",
  styleUrls: ["./sign-out.component.scss"]
})
export class SignOutComponent {
  constructor(public auth: AuthService, public router: Router) {
    this.auth.signOut().then(
      result => {
        console.log("Signed out successfully");
        router.navigate(['/auth/sign-in']);
      },
      err => {
        console.error("failed to sign out: ", err);
      }
    );
  }
}
