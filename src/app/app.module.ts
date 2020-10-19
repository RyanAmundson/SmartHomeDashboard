import { Router } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "src/environments/environment";
import { AngularFireModule, FirebaseApp } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { MatButtonModule } from "@angular/material/button";
import { FormGeneration } from "./_shared/form-generator/form-generation.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { MessagingService } from "./_shared/messaging.service";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { HttpClientModule } from "@angular/common/http";
import { UtilityService } from "./_services/utility.service";
import { PlatformModule } from '@angular/cdk/platform';
import { SharedModule } from './_shared/shared.module';
import { AuthModule } from './_authentication/authentication.module';
import { CountdownFormatPipe } from './_pipes/countdown.pipe';
import { PageNotFoundComponent } from './_common/page-not-found/page-not-found.component';
import { MobileModule } from './_mobile/mobile.module';
import { DialogComponent } from './open-issues/dialog/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SplashComponent } from './splash/splash.component';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SplashComponent,
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
    MobileModule,
    MatProgressSpinnerModule,
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
  exports: [PageNotFoundComponent],
})
export class AppModule {
}
