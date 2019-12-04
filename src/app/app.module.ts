import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { HighchartsChartModule } from "highcharts-angular";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
// import { RentComponent } from "./rent/rent.component";
import { environment } from "src/environments/environment.prod";
import { AngularFireModule, FirebaseApp } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { SuppliesComponent } from "./supplies/supplies.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { FormGeneration } from "./_shared/form-generator/form-generation.service";
import { ServiceWorkerModule } from "@angular/service-worker";

import { TileDirective } from "./directives/tile.directive";
import { LocationTrackerComponent } from "./location-tracker/location-tracker.component";
import { MessagingService } from "./_shared/messaging.service";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HttpClientModule } from "@angular/common/http";
import { UtilityService } from "./_services/utility.service";
import { ChoreService } from "./chores/_services/chore.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { OrderModule } from "ngx-order-pipe";
import { UtilitiesService } from "./utilities/_services/utilities.service";
// import * as SpotifyService from 'angular2-spotify';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";

import { MdcFabModule, MdcIconModule, MdcMenuModule } from "@angular-mdc/web";
import { MdcTopAppBarModule } from "@angular-mdc/web";
import { MdcListModule } from '@angular-mdc/web';
import { MdcTabBarModule } from '@angular-mdc/web';
import { AuthService } from './_authentication/auth.service';
import {PlatformModule} from '@angular/cdk/platform';
import { SignInComponent } from './sign-in/sign-in.component';
import { RentComponent } from './rent/rent.component';
import { SharedModule } from './_shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    // RentComponent,
    SuppliesComponent,
    TileDirective,
    LocationTrackerComponent,
    SignInComponent,
    RentComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    OrderModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    MatSelectModule,
    MdcFabModule,
    MdcIconModule,
    MdcMenuModule,
    MdcTopAppBarModule,
    MdcListModule,
    MdcTabBarModule,
    PlatformModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register("firebase-messaging-sw.js", { enabled: true })
  ],
  providers: [
    FormGeneration,
    // PushNotificationService,
    MessagingService,
    UtilityService,
    ChoreService,
    UtilitiesService,
    AuthService
  ],
  bootstrap: [AppComponent],
  exports: [],
  // entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule {}
