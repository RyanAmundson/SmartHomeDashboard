import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotesPageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotesComponent } from './notes.component';

const routes: Routes = [
    {
        path: "",
        component: NotesComponent,
        children: [
            {
                path: "notes",
                component: NotesComponent,
            },
            { path: '', redirectTo: 'notes', pathMatch: 'full' },
            { path: '**', component: NotesPageNotFoundComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotesRoutingModule { }
