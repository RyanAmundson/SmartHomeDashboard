import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileComponent } from './mobile.component';
import { SignedInGuard } from '../_guards/signed-in.guard';
import { MobilePageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  // {
  //   path: "mobile",
  //   loadChildren: () => import('./_mobile/mobile.module').then(m => m.MobileModule),
  //   canActivate: [SignedInGuard]
  // },
  // {
  //   path: "mobile",
  //   loadChildren: () => import('./_mobile/mobile.module').then(m => m.MobileModule),
  //   canActivate: [SignedInGuard]
  // },


  {
    path: '',
    component: MobileComponent,
    children: [
      {
        path: "chores",
        loadChildren: () => import('../chores/chores.module').then(m => m.ChoresModule),
        // canActivate: [SignedInGuard]
      },
      {
        path: "open-issues",
        loadChildren: () => import('../open-issues/open-issues.module').then(m => m.OpenIssuesModule),
        // canActivate: [SignedInGuard]
      },
      {
        path: "utilities",
        loadChildren: () => import('../utilities/utilities.module').then(m => m.UtilitiesModule),
        // canActivate: [SignedInGuard]
      },
      {
        path: "notes",
        loadChildren: () => import('../notes/notes.module').then(m => m.NotesModule),
        // canActivate: [SignedInGuard]
      },
      { path: '', redirectTo: 'chores', pathMatch: 'full' },
      { path: '**', component: MobilePageNotFoundComponent },
    ]
    // canActivate: [SignedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
