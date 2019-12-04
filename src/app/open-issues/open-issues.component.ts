import { Component, OnInit, HostListener, Input } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { UtilityService } from "../_services/utility.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { FirebaseDatabase } from "@angular/fire";
import { Issue } from "../_models/models";
import { timer, Observable, interval } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "../_authentication/auth.service";

@Component({
  selector: "shd-open-issues",
  templateUrl: "./open-issues.component.html",
  styleUrls: ["./open-issues.component.scss"]
})
export class OpenIssuesComponent {
  @Input() showAddButton = true;
  openIssues = [];
  countdowns: Map<string, any> = new Map();
  constructor(
    private firebase: AngularFireDatabase,
    public utility: UtilityService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    firebase
      .list("open-issues/full-list")
      .valueChanges()
      .subscribe(issues => {
        this.openIssues = issues;
        console.log(issues);
        this.openIssues.forEach(i => {
          let countdownStart = i.expirationTime - new Date().getTime();
          if (!this.countdowns.has(i.id) && countdownStart > 0) {
            this.setCountdown(i, countdownStart);
          } else if (countdownStart <= 0) {
            this.penalizeIssue(i);
          }
        });
      });
  }

  setCountdown(i, countdownStart) {
    let timeRemaining = timer(1000, 1000).pipe(
      map(count => (count = countdownStart - count * 1000)),
      map(count => {
        let hours = Math.floor(count / (1000 * 60 * 60));
        let minutes = Math.floor(count / (1000 * 60) - hours * 60);
        let seconds = Math.floor(count / 1000 - hours * 60 * 60 - minutes * 60);
        return `${hours.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}:${minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}:${seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}`;
      })
    );
    this.countdowns.set(i.id, timeRemaining);

    let timeoutRef = setTimeout(() => {
      this.penalizeIssue(i);
    }, countdownStart);
  }

  penalizeIssue(i: Issue) {
    i.timesPenalized = Math.trunc(
      (new Date().getTime() - i.timeCreated) / i.timeToResolve
    );
    i.expirationTime =
      i.timeCreated + i.timesPenalized * i.timeToResolve + i.timeToResolve;
    let countdownStart = i.expirationTime - new Date().getTime();
    let timeoutRef = setTimeout(() => {
      this.penalizeIssue(i);
    }, countdownStart);
    this.firebase.list("open-issues/full-list").update(i.id, i);
    this.firebase.list(`open-issues/penalties/${this.authService.user.displayName}`).push(i);
    console.log("issue penalized");
  }

  createIssue() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "90%"
      // height: '400px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result) {
        let ref = this.firebase.list("/open-issues/full-list").push({});
        let timeCreated = new Date().getTime();
        console.log(result.issue.who);
        ref.set(<Issue>{
          id: ref.key,
          type: result.issue.type,
          description: result.issue.description,
          additionalDescription: result.description,
          location: result.location,
          timeToResolve: result.issue.timeToResolve,
          timeCreated: timeCreated,
          expirationTime: timeCreated + result.issue.timeToResolve,
          penaltyAmount: result.issue.penaltyAmount,
          timesPenalized: 0,
          who: result.who
        });
      }
    });
  }

  completeIssue(i: Issue) {
    i.timeCompleted = new Date().getTime();
    this.firebase.list("open-issues/full-list").remove(i.id);
    this.firebase.list("open-issues/archive").update(i.id, i);
  }

  claimIssue(i: Issue) {
    i.who = {
      uid: this.authService.user.uid,
      displayName: this.authService.user.displayName,
      photoURL: this.authService.user.photoURL
    };

    this.firebase.list("open-issues/full-list").update(i.id, i);
  }

  unclaimIssue(i: Issue) {
    i.who = null;
    this.firebase.list("open-issues/full-list").update(i.id, i);
  }
}

@Component({
  selector: "shd-create-issue-dialog",
  templateUrl: "dialog-template.html"
})
export class DialogComponent {
  users: Observable<Partial<firebase.User>[]>;
  issueTemplates: Issue[];
  locations: string[] = [
    "Kitchen",
    "Guest Bathroom",
    "Living Room",
    "Hallway",
    "Garage",
    "Front yard",
    "Back Yard",
    "Family Room"
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private firebase: AngularFireDatabase
  ) {
    firebase
      .list("open-issues/issues")
      .valueChanges()
      .subscribe((issues: Issue[]) => {
        this.issueTemplates = issues;
      });
    this.users = firebase.list("users").valueChanges();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(issue, description, location, user) {
    this.dialogRef.close({
      issue: issue,
      description: description,
      location: location,
      who: {
        uid: user.uid || null,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null
      }
    });
  }
}
