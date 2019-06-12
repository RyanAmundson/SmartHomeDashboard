import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { ChoresComponent } from './chores/chores.component';
import { RentComponent } from './rent/rent.component';
import { NotesComponent } from './notes/notes.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { SuppliesComponent } from './supplies/supplies.component';
import { WifiWidget } from './widgets/wifi.component';
import { GateCodeWidget } from './widgets/gate.component';
import { PieAndTableComponent } from './_shared/pie-and-table/pie-and-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoresComponent,
    RentComponent,
    NotesComponent,
    UtilitiesComponent,
    SuppliesComponent,
    WifiWidget,
    GateCodeWidget,
    PieAndTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    HighchartsChartModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
