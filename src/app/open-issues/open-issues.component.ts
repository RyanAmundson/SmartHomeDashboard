import { DialogComponent } from './dialog/dialog.component';
import { AuthService } from './../_authentication/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit, HostListener, Input, ChangeDetectorRef } from "@angular/core";
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
import { map, take, tap } from "rxjs/operators";
import { OpenIssuesService } from './open-issue.service';

@Component({
  selector: "shd-open-issues",
  templateUrl: "./open-issues.component.html",
  styleUrls: ["./open-issues.component.scss"]
})
export class OpenIssuesComponent {
  @Input() showAddButton = true;
  openIssuesAsync: Observable<Issue[]>;
  countdowns: Map<string, any> = new Map();
  myPenalties: number;

  constructor(
    private firebase: AngularFireDatabase,
    public utility: UtilityService,
    public dialog: MatDialog,
    public authService: AuthService,
    public OIService: OpenIssuesService,
    public changeRef: ChangeDetectorRef,
    private storage: AngularFireStorage
  ) {
    this.openIssuesAsync = this.OIService.getAllOpenIssues().pipe(tap((issues) => {
      issues.forEach((i: Issue) => {
        i.timesPenalized = OIService.calculateTimesPenalized(i);
      })
    }));
    authService.authState.subscribe((x) => {
      // console.log(x.uid)
      this.OIService.getPenaltyCountByUser(x.uid).then((val) => {
        // console.log(val);
        this.myPenalties = val;

      })
    });
  }

  timerUpdate(issue) {
    // console.log("timerupdate")
    this.OIService.penalizeIssue(issue);
    this.changeRef.markForCheck();
  }

  createIssue() {
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "95%",
      maxHeight: "90%",
      autoFocus: true,
    });
    return dialogRef.afterClosed().toPromise().then((result) => this.OIService.createIssue(result));
  }

}
