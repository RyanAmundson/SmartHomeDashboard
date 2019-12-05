import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";




const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./_authentication/authentication.module').then(m => m.AuthModule),
  },
  {
    path: "mobile",
    loadChildren: () => import('./_mobile/mobile.module').then(m => m.MobileModule),
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
