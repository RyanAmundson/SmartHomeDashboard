import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdownFormat',
  pure: true
})
export class CountdownFormatPipe implements PipeTransform {
  oneHourInMS = 60 * 60 * 1000;
  oneMinuteInMS = 60 * 1000;
  oneSecondInMS = 1000;


  transform(timeRemainingAsync: any, ...args: any[]): any {
    return timeRemainingAsync.pipe(
      map((timeRemaining: number) => {
        var hours = Math.floor(timeRemaining / (60 * 60 * 1000));
        var minutes = Math.floor((timeRemaining - (hours * this.oneHourInMS)) / this.oneMinuteInMS);
        var seconds = Math.floor((timeRemaining - (hours * this.oneHourInMS) - (minutes * this.oneMinuteInMS)) / this.oneSecondInMS);

        return `${hours.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`;
      })
    )
  }
}
