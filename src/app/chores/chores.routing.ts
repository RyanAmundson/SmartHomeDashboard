import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
//   {
//     path: "",
//     component: AppComponent
//   },
//   {
//     path: "**",
//     component: AppComponent
//   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoresRoutingModule {}
