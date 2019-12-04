import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition,animate } from '@angular/animations';
import { GeneratedStyles } from 'src/assets/animate';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
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

export class TileComponent implements OnInit {
  @Input() noContainer = false;
  @Input() noFlow = false;
  disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
