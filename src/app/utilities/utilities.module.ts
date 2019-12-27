import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesComponent } from './utilities.component';
import { SharedModule } from '../_shared/shared.module';
import { UtilitiesSorterComponent } from './utility-sorter/utility-sorter.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderModule } from 'ngx-order-pipe';
import { UtilitiesService } from './_services/utilities.service';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { UtilitiesRoutingModule } from './utilites.routing';
import { UtilitiesPageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    UtilitiesComponent,
    UtilitiesSorterComponent,
    UtilitiesPageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    UtilitiesRoutingModule,
    SharedModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    OrderModule,
    MatListModule,
    MatTableModule,
  ],
  exports: [
    UtilitiesSorterComponent,
    UtilitiesComponent
  ],
  providers: [
    UtilitiesService
  ]
})
export class UtilitiesModule { }
