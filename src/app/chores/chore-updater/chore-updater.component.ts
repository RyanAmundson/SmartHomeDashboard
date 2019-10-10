import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneratedStyles } from '../../../assets/animate';
import { trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'shd-chores-updater',
  templateUrl: './chore-updater.component.html',
  styleUrls: ['./chore-updater.component.scss']
})
export class ChoreUpdaterComponent {

}
