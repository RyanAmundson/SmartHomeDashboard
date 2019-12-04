import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopRoutingModule } from './desktop.routing';
import { DesktopComponent } from './desktop.component';


@NgModule({
  declarations: [DesktopComponent],
  imports: [
    CommonModule,
    DesktopRoutingModule
  ]
})
export class DesktopModule { }
