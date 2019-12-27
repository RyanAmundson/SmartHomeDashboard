import { Component, OnInit, HostListener, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneratedStyles } from '../../assets/animate';
import { trigger, transition, animate } from '@angular/animations';
import { UtilityService } from '../_services/utility.service';
import { ChoreService } from './_services/chore.service';
import { Chore, ChoreStatus } from '../_models/models';

@Component({
  selector: 'shd-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.scss'],
  animations: [
    trigger('fade', [
      transition(`:leave`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeOut)
      ]),

      transition(`:enter`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeIn)
      ]),


    ]),
    trigger('fadeHorizontal', [
      transition(`:leave`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeOutRight)
      ]),

      transition(`:enter`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeInLeft)
      ]),

      transition(`:increment`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeOutRight),
        animate('0.5s 0.5s ease', GeneratedStyles.Animations.fadeInLeft)
      ]),

      transition(`:decrement`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeOutRight),
        animate('0.5s 0.5s ease', GeneratedStyles.Animations.fadeInLeft)
      ]),
    ])
  ]
})
export class ChoresComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
