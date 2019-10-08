import { Component, ViewChild, HostListener } from "@angular/core";
import * as Highcharts from "highcharts";
import { Observable, timer } from "rxjs";

@Component({
  selector: "wifi-widget",
  template: `
    <mat-card id="footer-card-1" class="dashboard-card">
      <mat-card-content>
        <div class="icon">
          <i class="fas fa-wifi fa-2x"></i>
        </div>
        <div class="info">
          <div style="display:block">Network: NETGEAR51</div><br>
          <div style="display:block">Access: aquaticrabbit053</div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      #footer-card-1 {
        align-self: center;
        margin: 3px;
        flex: 1 1 100%;
        align-items: center;
        justify-content: center;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
        // color:white;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        background-color: rgba(255, 255, 255, 0.5);
      }

      mat-card-content {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
      .icon,
      .info {
                margin: 3px;
      }
    `
  ]
})
export class WifiWidget {}
