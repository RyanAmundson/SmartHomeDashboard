import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { OpenIssuesService } from './../open-issue.service';
import { AuthService } from './../../_authentication/auth.service';
import { Issue } from 'src/app/_models/models';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shd-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent {

  @Input() issue: Issue;
  @ViewChild("timer") timer: ElementRef;

  issueImageAsync: Observable<any>;

  statusClassName: 'good' | 'warning' | 'danger';

  constructor(public authService: AuthService, public OIService: OpenIssuesService, private storage: AngularFireStorage) {

  }

  ngOnChanges() {
  }

  timerCompleted(issue: Issue) {
    this.OIService.updateIssue(issue);
  }

}
