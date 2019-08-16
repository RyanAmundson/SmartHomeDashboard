import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneratedStyles } from '../../assets/animate';
import { trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-utilities2',
  templateUrl: './utilities2.component.html',
  styleUrls: ['./utilities2.component.scss'],
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
export class Utilities2Component {
  updating = false;
  displayedColumns: string[] = ['Who', 'This Week', 'Next Week'];

  utilities = this.firebase.list('utilities/breakdown').snapshotChanges()
    .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 800) {
      this.updating = true;
    } else {
      this.updating = false;
    }
  }

  constructor(private firebase: AngularFireDatabase) {
    if (window.innerWidth < 800) {
      this.updating = true;
    } else {
      this.updating = false;
    }
  }
}
