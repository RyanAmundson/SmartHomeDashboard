import { NgModule } from "@angular/core";
import { AuthRouteModule } from './auth.routing';
import { AuthService } from './auth.service';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { SignedInGuard } from '../_guards/signed-in.guard';


@NgModule({
  declarations: [
    SignInComponent,
    SignOutComponent
  ],
  imports: [
    AuthRouteModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatButtonModule,
  ],
  providers: [
    AuthService,
    SignedInGuard
  ],
  exports: [],
})
export class AuthModule {}
