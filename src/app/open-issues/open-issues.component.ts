import { Component, OnInit, HostListener } from "@angular/core";
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

@Component({
  selector: "shd-open-issues",
  templateUrl: "./open-issues.component.html",
  styleUrls: ["./open-issues.component.scss"]
})
export class OpenIssuesComponent {
  openIssues = [];
  countdowns: Map<string, any> = new Map();
  constructor(
    private firebase: AngularFireDatabase,
    public utility: UtilityService,
    public dialog: MatDialog
  ) {
    firebase
      .list("open-issues/full-list")
      .valueChanges()
      .subscribe(issues => {
        this.openIssues = issues;
        console.log(issues);
        this.openIssues.forEach(i => {
          console.log(i.id, this.countdowns.size);
          if (!this.countdowns.has(i.id)) {
            let countdownStart = i.expirationTime - new Date().getTime();
            let timeRemaining = timer(1000, 1000).pipe(
              map(count => count = countdownStart - (count * 1000)),
              map((count) => {
                let hours = Math.floor(count / (1000 * 60 * 60));
                let minutes = Math.floor(count / (1000 * 60) - hours * 60);
                let seconds = Math.floor(
                  count / 1000 - hours * 60 * 60 - minutes * 60
                );
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
          }
        });
      });
  }

  createIssue() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "90%"
      // height: '400px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result) {
        let ref = this.firebase.list("/open-issues/full-list").push({});
        let timeCreated = new Date().getTime();
        ref.set(<Issue>{
          id: ref.key,
          type: result.issue.type,
          description: result.issue.description,
          additionalDescription: result.description,
          location: result.location,
          timeToResolve: result.issue.timeToResolve,
          timeCreated: timeCreated,
          expirationTime: timeCreated + result.issue.timeToResolve,
          penaltyAmount: result.issue.penaltyAmount
        });
      }
    });
  }

  completed() {}
}

@Component({
  selector: "shd-create-issue-dialog",
  templateUrl: "dialog-template.html"
})
export class DialogOverviewExampleDialog {
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
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private firebase: AngularFireDatabase
  ) {
    firebase
      .list("open-issues/issues")
      .valueChanges()
      .subscribe((issues: Issue[]) => {
        this.issueTemplates = issues;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(issue, description, location) {
    this.dialogRef.close({
      issue: issue,
      description: description,
      location: location
    });
  }
}
