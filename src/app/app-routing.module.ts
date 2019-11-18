import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MobileHomeComponent } from "./mobile/home/home.component";
import { AppComponent } from "./app.component";
import { DashboardStaticComponent } from "./dashboard-static/dashboard-static.component";
import { MobileUtilitiesComponent } from "./mobile/utilities/utilities.component";
import { UtilitiesComponent } from './utilities/utilities.component';
import { OpenIssuesComponent } from './open-issues/open-issues.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardStaticComponent,
    outlet: "home"
  },
  {
    path: "dashboard",
    component: UtilitiesComponent,
    outlet: "utilities"
  },
  {
    path: "dashboard",
    component: OpenIssuesComponent,
    outlet: "openIssues"
  },
  {
    path: "mobile",
    component: MobileHomeComponent,
    outlet: "home"
  },
  {
    path: "mobile",
    component: MobileUtilitiesComponent,
    outlet: "utilities"
  },
  {
    path: "mobile",
    component: OpenIssuesComponent,
    outlet: "openIssues"
  },
  {
    path: "",
    component: AppComponent
  },
  {
    path: "**",
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
