import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
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
import { UpdaterComponent } from './updater/updater.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SpotifyComponent } from './spotify/spotify.component';
import { FormGeneration } from './_shared/form-generator/form-generation.service';
import { FormGenerator } from './_shared/form-generator/form-generator.component';
import { Utilities2Component } from './utilities2/utilities2.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PushNotificationService } from 'ngx-push-notifications';
import { TileComponent } from './tile/tile.component';
import { TileDirective } from './directives/tile.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusWidgetComponent } from './_shared/status-widget/status-widget.component';
import { LocationTrackerComponent } from './location-tracker/location-tracker.component';
import { MessagingService } from './_shared/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    ChoresComponent,
    RentComponent,
    NotesComponent,
    UtilitiesComponent,
    Utilities2Component,
    SuppliesComponent,
    WifiWidget,
    GateCodeWidget,
    PieAndTableComponent,
    UpdaterComponent,
    SpotifyComponent,
    FormGenerator,
    TileComponent,
    TileDirective,
    DashboardComponent,
    StatusWidgetComponent,
    LocationTrackerComponent
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
    AngularFireAuthModule,
    AngularFireMessagingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ServiceWorkerModule.register('firebase-messaging-sw.js', { enabled: true })

  ],
  providers: [FormGeneration, PushNotificationService,MessagingService],
  bootstrap: [AppComponent],
  exports: [UpdaterComponent]
})
export class AppModule { }
