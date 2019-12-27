import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenIssuesComponent } from './open-issues.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OpenIssuesDashboardWidget } from './open-issue-dash-widget/open-issue-dashboard-widget.component';
import { AuthModule } from '../_authentication/authentication.module';
import { OpenIssuesService } from './open-issue.service';
import { CountdownFormatPipe } from '../_pipes/countdown.pipe';
import { DialogComponent } from './dialog/dialog.component';
import { OpenIssuesRoutingModule } from './open-issues.routing';
import { OpenIssuesPageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MdcLinearProgressModule } from '@angular-mdc/web';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadComponent } from './dialog/upload/upload.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    OpenIssuesComponent,
    DialogComponent,
    OpenIssuesDashboardWidget,
    OpenIssuesPageNotFoundComponent,
    CountdownTimerComponent,
    CountdownFormatPipe,
    IssueCardComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OpenIssuesRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    AuthModule,
    AngularFireStorageModule,
    MdcLinearProgressModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  exports: [
    DialogComponent,
    OpenIssuesComponent,
    OpenIssuesDashboardWidget
  ],
  providers: [
    OpenIssuesService,
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class OpenIssuesModule { }
