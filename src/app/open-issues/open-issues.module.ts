import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenIssuesComponent, DialogComponent } from './open-issues.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OpenIssuesDashboardWidget } from './open-issue-dash-widget/open-issue-dashboard-widget.component';



@NgModule({
  declarations: [
    OpenIssuesComponent,
    DialogComponent,
    OpenIssuesDashboardWidget
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    DialogComponent,
    OpenIssuesComponent,
    OpenIssuesDashboardWidget
  ],
  providers: [],
  entryComponents: [
    DialogComponent
  ]
})
export class OpenIssuesModule { }
