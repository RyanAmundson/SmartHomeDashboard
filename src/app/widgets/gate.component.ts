import { Component, ViewChild, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'gate-code-widget',
  template: `
    <mat-card id="footer-card-2" class="dashboard-card">
      <mat-card-content>
      <div class="icon">
        <mat-icon>drive_eta</mat-icon>
      </div>
      <div class="info">
        PIN 888888 OK
      </div>
    </mat-card-content>
</mat-card>`,
  styles: [`
    #footer-card-2 {
        flex:1 1 100%;
        align-self:center;
        margin:3px;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
        // color:white;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        background-color:rgba(255, 255, 255, 0.5);
    }

    .mat-card-content {

      display:flex;
      flex-direction:row;
      justify-content:space-around;
      align-items:center;

      .icon, .info {
        display:flex;
        margin:5px;
      }
    }
    `]
})
export class GateCodeWidget {

}
