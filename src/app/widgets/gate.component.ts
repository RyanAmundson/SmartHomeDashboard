import { Component, ViewChild, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, timer } from 'rxjs';

@Component({
    selector: 'gate-code-widget',
    template: `                    
    <mat-card id="footer-card-2" class="dashboard-card">
    <mat-card-header>
        <mat-card-title>Gate</mat-card-title>
        <mat-icon>drive_eta</mat-icon>
    </mat-card-header>
    <mat-card-content>
        PIN 888888 OK
    </mat-card-content>
</mat-card>`,
    styles: [`
    #footer-card-2 {
        width:100%;
    }
    `]
})
export class GateCodeWidget {

}
