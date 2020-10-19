import { ChoresService } from './_services/chore-fixed.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoreSorterComponent } from './chore-sorter/chore-sorter.component';
import { ChoresComponent } from './chores.component';
import { ChoreUpdaterComponent } from './chore-updater/chore-updater.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SharedModule } from '../_shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderModule } from 'ngx-order-pipe';
import { ChoreService } from './_services/chore.service';
import { ChoresRoutingModule } from './chores.routing';
import { ChoresWidgetComponent } from './chores-widget/chores-widget.component';
import { ChoresPageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChoreRotaterComponent } from './chore-rotater/chore-rotater.component';
import { ChorePage1Component } from './chore-pages/chore-page1/chore-page1.component';


@NgModule({
  declarations: [
    ChoreSorterComponent,
    ChoresComponent,
    ChoreUpdaterComponent,
    ChoresWidgetComponent,
    ChoresPageNotFoundComponent,
    ChoreRotaterComponent,
    ChorePage1Component
  ],
  imports: [
    CommonModule,
    ChoresRoutingModule,
    DragDropModule,
    SharedModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    OrderModule,

  ],
  exports: [
    ChoreSorterComponent,
    ChoresComponent,
    ChoreUpdaterComponent
  ],
  providers: [
    ChoreService,
    ChoresService
  ]
})
export class ChoresModule { }
