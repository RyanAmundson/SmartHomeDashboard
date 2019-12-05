import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "src/environments/environment.prod";
import { AngularFireModule, FirebaseApp } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { MatButtonModule } from "@angular/material/button";
import { FormGeneration } from "./_shared/form-generator/form-generation.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { MessagingService } from "./_shared/messaging.service";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { HttpClientModule } from "@angular/common/http";
import { UtilityService } from "./_services/utility.service";
import {PlatformModule} from '@angular/cdk/platform';
import { SharedModule } from './_shared/shared.module';
import { AuthModule } from './_authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    MatButtonModule,
    HttpClientModule,
    PlatformModule,
    SharedModule,
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register("firebase-messaging-sw.js", { enabled: true })
  ],
  providers: [
    FormGeneration,
    // PushNotificationService,
    MessagingService,
    UtilityService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
