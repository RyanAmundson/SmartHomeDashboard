import { Component, OnInit, HostListener, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneratedStyles } from '../../assets/animate';
import { trigger, transition, animate } from '@angular/animations';
import { UtilitiesService } from './_services/utilities.service';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
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
export class UtilitiesComponent {
  @Input() iconsOnly = false;
  @Input() showCostRight = false;
  updating = false;
  displayedColumns: string[] = ['Who', 'This Week', 'Next Week'];

  utilities = this.firebase.list('utilities/breakdown').snapshotChanges()
    .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

  @HostListener('window:resize', ['$event'])
  onResize(event) {

  }

  constructor(private firebase: AngularFireDatabase, private utilitiesService:UtilitiesService) {

  }
}
