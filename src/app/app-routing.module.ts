import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './_common/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';




const routes: Routes = [
  {
    path: "mobile",
    loadChildren: () => import('./_mobile/mobile.module').then(m => m.MobileModule),
  },
  // {
  //   path: "auth",
  //   loadChildren: () => import('./_authentication/authentication.module').then(m => m.AuthModule),
  // },
  {
    path: "dashboard",
    loadChildren: () => import('./_dashboard/dashboard.module').then(m => m.DashboardModule),
  },

  { path: '', redirectTo: 'mobile', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
