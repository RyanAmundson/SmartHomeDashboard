import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignedInGuard } from './_guards/signed-in.guard';
import { MobileComponent } from './_mobile/mobile.component';




const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: "mobile",
    loadChildren: () => import('./_mobile/mobile.module').then(m => m.MobileModule),
    canActivate: [SignedInGuard]
  },
  {
    path: "dashboard",
    loadChildren: () => import('./_dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  // {
  //   path: "desktop",
  //   component: OpenIssuesComponent,
  // },
  {
    path: "",
    pathMatch: 'full',
    redirectTo: 'mobile'
  },
  {
    path: "**",
    pathMatch: 'full',
    redirectTo: 'mobile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
