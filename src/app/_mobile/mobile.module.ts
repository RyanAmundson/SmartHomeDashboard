import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthModule } from './../_authentication/authentication.module';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MobilePageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from '../_authentication/auth.service';
import { DrawerMenuComponent } from './drawer-menu/drawer-menu.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';

@NgModule({
  declarations: [MobileComponent, MobilePageNotFoundComponent, DrawerMenuComponent, DrawerContentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MobileRoutingModule,
    AuthModule,
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
  ],
  exports: [MobileComponent],
  providers: [AuthService, AngularFireAuthGuard]
})
export class MobileModule { }
