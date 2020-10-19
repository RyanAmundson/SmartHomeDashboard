import { GeneratedStyles } from './../assets/animate';
import { trigger } from '@angular/animations';
import { transition } from '@angular/animations';
import { animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { Router, RouterEvent, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
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
export class AppComponent {
  loading = true;
  asyncLoadCount = 1;
  constructor(private router: Router
  ) {
    router.events
      .pipe(
        // filter(e => e instanceof RouterEvent)
      )
      .subscribe((event: RouterEvent) => {
        console.log(event.constructor.name);
        if (event.constructor.name === 'NavigationStart') {
          this.loading = true;
        } else if (event.constructor.name === 'NavigationEnd') {
          this.loading = false;
        } else if (event instanceof RouteConfigLoadStart) {
          this.asyncLoadCount++;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.asyncLoadCount--;
        }

      });
  }
}
