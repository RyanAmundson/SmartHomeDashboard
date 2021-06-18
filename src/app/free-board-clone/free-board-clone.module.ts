import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterDashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { GridsterModule } from 'angular-gridster2';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    GridsterDashboardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    GridsterModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class FreeBoardCloneModule { }
