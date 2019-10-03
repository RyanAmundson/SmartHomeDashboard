import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneratedStyles } from '../../assets/animate';
import { trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-chores',
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
  updating = false;
  displayedColumns: string[] = ['Who', 'This Week', 'Next Week'];

  chores;
  rI = 0;

  people = this.firebase.list('chores/people').snapshotChanges().pipe(map(changes => changes.map(c => c.payload.key)));
  rotationIndex = this.firebase.object('chores/rotationIndex').valueChanges();
  choreBreakdown = this.firebase.list('chores/breakdown').snapshotChanges()
    .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe((chores) => {
      this.chores = chores.sort((a:any,b:any) => { return a.order - b.order});

    })


  @Output() loadingComplete: EventEmitter<void> = new EventEmitter();
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

    this.rotationIndex.subscribe((r: number) => (this.rI = r));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadingComplete.emit();
  }

  rotateChores() {
    this.firebase.object('chores/rotationIndex').set((this.rI + 1) % 4);
  }
}
