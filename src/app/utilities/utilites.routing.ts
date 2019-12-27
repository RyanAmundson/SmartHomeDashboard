import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UtilitiesPageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UtilitiesSorterComponent } from './utility-sorter/utility-sorter.component';

const routes: Routes = [
    {
        path: "",
        component: UtilitiesSorterComponent,
        children: [
            {
                path: "sorter",
                component: UtilitiesSorterComponent,
            },
            { path: '', redirectTo: 'sorter', pathMatch: 'full' },
            { path: '**', component: UtilitiesPageNotFoundComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
