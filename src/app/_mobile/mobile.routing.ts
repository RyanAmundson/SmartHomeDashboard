import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileComponent } from './mobile.component';
import { SignedInGuard } from '../_guards/signed-in.guard';
import { MobilePageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
    children: [
      {
        path: "chores",
        loadChildren: () => import('../chores/chores.module').then(m => m.ChoresModule),
        // canActivateChild: [AngularFireAuthGuard]
      },
      {
        path: "open-issues",
        loadChildren: () => import('../open-issues/open-issues.module').then(m => m.OpenIssuesModule),
        // canActivateChild: [AngularFireAuthGuard]
      },
      {
        path: "utilities",
        loadChildren: () => import('../utilities/utilities.module').then(m => m.UtilitiesModule),
        // canActivateChild: [AngularFireAuthGuard]
      },
      {
        path: "notes",
        loadChildren: () => import('../notes/notes.module').then(m => m.NotesModule),
        // canActivateChild: [AngularFireAuthGuard]
      },
      {
        path: "auth",
        loadChildren: () => import('../_authentication/authentication.module').then(m => m.AuthModule),
      },

      { path: '', redirectTo: 'chores', pathMatch: 'full' },
      { path: '**', component: MobilePageNotFoundComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
