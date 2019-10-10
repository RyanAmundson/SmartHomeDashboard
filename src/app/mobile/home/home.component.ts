import { Component, OnInit, HostListener, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChoreService } from 'src/app/chores/_services/chore.service';

@Component({
  selector: 'shd-mobile',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class MobileHomeComponent {


  constructor(private firebase: AngularFireDatabase, public chores:ChoreService) {
  }


}
