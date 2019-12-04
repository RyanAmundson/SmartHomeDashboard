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


@NgModule({
  declarations: [
    ChoreSorterComponent,
    ChoresComponent,
    ChoreUpdaterComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    SharedModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    OrderModule
    
  ],
  exports :[
    ChoreSorterComponent,
    ChoresComponent,
    ChoreUpdaterComponent
  ]
})
export class ChoresModule { }
