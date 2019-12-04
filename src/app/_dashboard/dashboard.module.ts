import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardStaticComponent } from './static/dashboard-static.component';
import { SharedModule } from '../_shared/shared.module';
import { ChoresModule } from '../chores/chores.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { NotesModule } from '../notes/notes.module';
import { OpenIssuesModule } from '../open-issues/open-issues.module';


@NgModule({
  declarations: [
    DashboardStaticComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChoresModule,
    UtilitiesModule,
    NotesModule,
    OpenIssuesModule
  ]
})
export class DashboardModule { }
