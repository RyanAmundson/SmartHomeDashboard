import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { SharedModule } from '../_shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderModule } from 'ngx-order-pipe';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [
    CommonModule,
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
    NotesComponent
  ]
})
export class NotesModule { }
