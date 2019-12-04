import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardStaticComponent } from './static/dashboard-static.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardStaticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
