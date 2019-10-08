import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MobileHomeComponent } from './mobile/home/home.component';
import { AppComponent } from './app.component';
import { DashboardStaticComponent } from './dashboard-static/dashboard-static.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardStaticComponent,
    outlet: "home"
  },
  {
    path: 'mobile',
    component: MobileHomeComponent,
    outlet: "home"
  },
  {
    path: '',
    component: AppComponent,
  },
  {
    path: '**',
    component: AppComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
