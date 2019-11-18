import { Component, OnInit, HostListener, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChoreService } from 'src/app/chores/_services/chore.service';

@Component({
  selector: 'utilities-mobile',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class MobileUtilitiesComponent {


  constructor() {
  }


}
