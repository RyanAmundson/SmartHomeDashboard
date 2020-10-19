import { Router, RouterEvent } from '@angular/router';
import { GeneratedStyles } from './../../assets/animate';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';
import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shd-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  animations: [
    trigger('fade', [
      transition(`:leave`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeOut)
      ]),
      transition(`:enter`, [
        animate('0.5s ease', GeneratedStyles.Animations.fadeIn)
      ]),
    ]),
  ]
})
export class SplashComponent {
  loading = true;
  constructor(private router: Router) {
    router.events
      .pipe(
        // filter(e => e instanceof RouterEvent)
      )
      .subscribe((event: RouterEvent) => {
      });
  }

}
