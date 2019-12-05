import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileComponent } from './mobile.component';
import { SignedInGuard } from '../_guards/signed-in.guard';


const routes: Routes = [
  {
    path: "",
    component: MobileComponent,
    canActivate: [SignedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
