import { Component, OnInit, ViewChild } from '@angular/core';
// import { PushNotificationService } from 'ngx-push-notifications';
import { MessagingService } from '../_shared/messaging.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { UtilityService } from '../_services/utility.service';
import { AuthService } from '../_authentication/auth.service';
import { ChoreService } from '../chores/_services/chore.service';

@Component({
  selector: 'shd-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent {

  @ViewChild('mat-tab-group', {static: false}) tabGroup;

  title = "SmartHomeDashboard";
  activeTab = 0;
  navLocation = 'above';

  constructor(
    // private pushNotificationService: PushNotificationService,
    public messagingService: MessagingService,
    public firebase: AngularFireDatabase,
    public router: Router,
    public utility: UtilityService,
    public authService:AuthService,
    public chores: ChoreService
  ) {
  }

}
