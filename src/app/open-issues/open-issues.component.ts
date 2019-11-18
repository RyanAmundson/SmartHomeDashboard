import { Component, OnInit, HostListener } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { UtilityService } from "../_services/utility.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "shd-open-issues",
  templateUrl: "./open-issues.component.html",
  styleUrls: ["./open-issues.component.scss"]
})
export class OpenIssuesComponent {
  openIssues = [];

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
        this.firebase.list("/open-issues/full-list").push({
          type: result.issue,
          description: result.description,
          timeToFix: 24,
          penaltyAmount: 1
        });
      }
    });
  }
}

@Component({
  selector: "shd-create-issue-dialog",
  templateUrl: "dialog-template.html"
})
export class DialogOverviewExampleDialog {
  issueTemplates = ["test", "test2"];
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(issue, description) {
    this.dialogRef.close({ issue: issue, description: description });
  }
}
