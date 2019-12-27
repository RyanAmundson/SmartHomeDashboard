import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OpenIssuesComponent } from './open-issues.component';
import { OpenIssuesPageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: "",
        component: OpenIssuesComponent,
        children: [
            // {
            //     path: "sorter",
            //     component: OpenIssuesComponent,
            // },
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '**', component: OpenIssuesPageNotFoundComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OpenIssuesRoutingModule { }
