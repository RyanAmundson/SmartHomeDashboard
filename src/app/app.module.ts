import { Router } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";
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
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GridsterModule } from 'angular-gridster2';
import { MatIconModule } from '@angular/material/icon';
import { FreeBoardCloneModule } from './free-board-clone/free-board-clone.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    MatButtonModule,
    HttpClientModule,
    PlatformModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register("firebase-messaging-sw.js", { enabled: true }),
    AuthModule,
    AngularFireAuthGuardModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    GridsterModule,
    MatButtonModule,
    FreeBoardCloneModule
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
