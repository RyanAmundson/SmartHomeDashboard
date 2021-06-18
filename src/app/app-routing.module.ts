import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './_common/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SignInComponent } from './_authentication/sign-in/sign-in.component';
import { SignOutComponent } from './_authentication/sign-out/sign-out.component';
import { SignedInGuard } from './_authentication/_guards/signed-in.guard';
import { hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, AngularFireAuthGuard, canActivate } from '@angular/fire/auth-guard';
import { GridsterDashboardComponent } from "./free-board-clone/dashboard/dashboard.component";

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToMobile = () => redirectLoggedInTo(['mobile']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);


const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    canActivate: [AngularFireAuthGuard], 
    ...canActivate(redirectUnauthorizedToLogin()), 
    ...canActivate(redirectLoggedInToMobile())
  },
  {
    path: "mobile",
    loadChildren: () => import('./_mobile/mobile.module').then(m => m.MobileModule),
    canActivate: [AngularFireAuthGuard], ...canActivate(redirectUnauthorizedToLogin())
  },
  {
    path: "dashboard",
    loadChildren: () => import('./_dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: "free-board-clone",
    component: GridsterDashboardComponent
  },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
