
import { map, tap, filter, take, takeUntil, finalize, catchError, takeWhile } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { timer, Observable, interval } from 'rxjs';

@Component({
  selector: 'shd-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {

  @Input() startTime: number;
  @Input() duration: number;
  @Output() timerCompleted: EventEmitter<void> = new EventEmitter();

  timeRemaining: number;
  countdown: Observable<number>;
  defaultValue = " - - : - - : - - ";
  updating = true;

  constructor() {

  }

  ngOnInit() {
    this.setCountdown(this.startTime, this.duration);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let startTimeChange = simpleChanges['startTime'];
    let durationChange = simpleChanges['duration'];
    // console.log("ng changes", this.startTime, this.duration);
    if (startTimeChange && startTimeChange.currentValue !== startTimeChange.previousValue) {
      this.setCountdown(startTimeChange.currentValue, durationChange.currentValue);
    } else if (durationChange && durationChange.currentValue !== durationChange.previousValue) {
      this.setCountdown(startTimeChange.currentValue, durationChange.currentValue);
    }
  }


  setCountdown(startTime, duration) {
    if (this.startTime && this.duration) {
      this.countdown = null;
      this.updating = true;
      let currentTime = new Date().getTime();
      let endTime = startTime + duration;
      let timePassed = currentTime - this.startTime;
      let timeRemaining = endTime - currentTime;
      if (timeRemaining < 0) {
        // console.log("Countdown has already expired");
      } else {
        let counter = <Observable<number>> interval(1000).pipe(
          map((count) => Math.max(0, timeRemaining - (count * 1000))),
          takeWhile(v => v >= 0),
          tap((x) => {
            if (x === 0) {
              this.timerCompleted.emit()
            }
          })
        );

        this.countdown = counter;
      }
      this.updating = false;
    }
  }

}
