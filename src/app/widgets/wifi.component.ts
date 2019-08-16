import { Component, ViewChild, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'wifi-widget',
  template: `
<mat-card id="footer-card-1" class="dashboard-card">
  <mat-card-content>
      <div class="icon">
        <i class="fas fa-wifi fa-2x"></i>
      </div>
      <div class="info">
        <div style="display:block">Network: NETGEAR51 </div>
        <div style="display:block">Access: ############</div>
      </div>
  </mat-card-content>
</mat-card>`,
  styles: [
    `#footer-card-1 {
        flex:1 1 100%;
        align-items:stretch;
        justify-content:stretch;
    }

    mat-card-content {
      display:flex;
      flex-direction:row;
      justify-content:space-around;
      align-items:center;

      .icon, .info {
        display:flex;
        margin:5px;
      }
    }
    `
  ]
})
export class WifiWidget {

}
