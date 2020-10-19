import { Component } from "@angular/core";
import { FirebaseDatabase } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";
import { Issue } from 'src/app/_models/models';

@Component({
  selector: "shd-open-issue-widget",
  templateUrl: "./open-issue-dashboard-widget.component.html",
  styleUrls: ["./open-issue-dashboard-widget.component.scss"]
})
export class OpenIssuesDashboardWidget {
  newIssues: number;
  almostDueIssues: number;
  pastDueIssues: number;

  constructor(public firebase: AngularFireDatabase) {
    this.firebase
      .list("open-issues/full-list")
      .valueChanges()
      .subscribe((list: Issue[]) => {
        // console.log(list);
        this.newIssues = list.filter((item) => {
          if (new Date().getTime() - item.timeCreated <= (item.timeToResolve / 2)) {
            return true;
          }
          return false;
        }).length;

        this.almostDueIssues = list.filter((item) => {
          if (new Date().getTime() - item.timeCreated >= (item.timeToResolve / 2) && new Date().getTime() - item.timeCreated < (item.timeToResolve)) {
            return true;
          }
          return false;
        }).length;

        this.pastDueIssues = list.filter((item) => {
          if (new Date().getTime() - item.timeCreated >= (item.timeToResolve)) {
            return true;
          }
          return false;
        }).length;
      });
  }
}
