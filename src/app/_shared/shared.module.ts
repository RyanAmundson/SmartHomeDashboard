import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGenerator } from './form-generator/form-generator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrderModule } from "ngx-order-pipe";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TileComponent } from './tile/tile.component';
import { PieAndTableComponent } from './pie-and-table/pie-and-table.component';
import { StatusWidgetComponent } from './status-widget/status-widget.component';

@NgModule({
  declarations: [
    FormGenerator,
    TileComponent,
    PieAndTableComponent,
    StatusWidgetComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    OrderModule,
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
  exports :[
    FormGenerator,
    TileComponent
  ]
})
export class SharedModule { }
