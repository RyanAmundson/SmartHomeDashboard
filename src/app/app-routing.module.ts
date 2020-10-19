import { SplashComponent } from './splash/splash.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PageNotFoundComponent } from './_common/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';




const routes: Routes = [

  {
    path: 'splash',
    component: SplashComponent
  },
  {
    path: "mobile",

  }
  // {
  //   path: "mobile",
  //   loadChildren: () => import('./_mobile/mobile.module').then(m => m.MobileModule),

  // },

  { path: '', redirectTo: 'mobile', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })], //, preloadingStrategy: PreloadAllModules
  exports: [RouterModule]
})
export class AppRoutingModule { }
