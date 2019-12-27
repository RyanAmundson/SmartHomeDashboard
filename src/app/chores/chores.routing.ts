import { ChorePage1Component } from './chore-pages/chore-page1/chore-page1.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChoresComponent } from './chores.component';
import { ChoreSorterComponent } from './chore-sorter/chore-sorter.component';
import { ChoresPageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: "",
    component: ChoresComponent,
    children: [
      {
        path: "premade-1",
        component: ChorePage1Component,
      },
      {
        path: "sorter",
        component: ChoreSorterComponent,
      },
      { path: '', redirectTo: 'premade-1', pathMatch: 'full' },
      { path: '**', component: ChoresPageNotFoundComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoresRoutingModule { }
