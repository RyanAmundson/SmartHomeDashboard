import { Component, ViewChild, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';

@Component({
    selector: 'wifi-widget',
    template: `                    
<mat-card id="footer-card-1" class="dashboard-card">
  <mat-card-header>
      <mat-card-title>WiFi</mat-card-title>
      <mat-icon>signal_wifi_4_bar</mat-icon>
  </mat-card-header>
  <mat-card-content>
      <div style="display:inline-block">Network: ########### </div>
      <div style="display:inline-block">Access: ############</div>
  </mat-card-content>
</mat-card>`,
    styles: [
        `#footer-card-1 {
        flex:1 1 100%;
        align-items:stretch;
        justify-content:stretch;
    }`
]
})
export class WifiWidget {

}
