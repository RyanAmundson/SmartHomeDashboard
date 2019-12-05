import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MobileRoutingModule } from "./mobile.routing";
import { MobileComponent } from "./mobile.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import {
  MdcFabModule,
  MdcIconModule,
  MdcMenuModule,
  MdcTopAppBarModule,
  MdcListModule,
  MdcTabBarModule
} from "@angular-mdc/web";
import { ChoresModule } from "../chores/chores.module";
import { OpenIssuesModule } from "../open-issues/open-issues.module";
import { UtilitiesModule } from '../utilities/utilities.module';
import { SharedModule } from '../_shared/shared.module';
import { NotesModule } from '../notes/notes.module';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthModule } from '../_authentication/authentication.module';

@NgModule({
  declarations: [MobileComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    HttpClientModule,
    //
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    //
    DragDropModule,
    //
    MdcFabModule,
    MdcIconModule,
    MdcMenuModule,
    MdcTopAppBarModule,
    MdcListModule,
    MdcTabBarModule,
    //
    ChoresModule,
    OpenIssuesModule,
    UtilitiesModule,
    SharedModule,
    NotesModule,
  ],
  exports: [MobileComponent],
  providers: []
})
export class MobileModule {}
