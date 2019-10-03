import { Component, OnInit, HostListener, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService, PushNotificationOptions } from 'ngx-push-notifications';
import { timer } from 'rxjs';
import { TileComponent } from '../tile/tile.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChildren(AppRoutingModule) appTiles: QueryList<any>;
  title = 'SmartHomeDashboard';
  date = Date.now();
  timeObs = timer(1000, 1000);
  activeTab = 0;
  key;
  disableCycleButton = false;

  choreList = [];
  utilitiesList = ["water","electricity","garbage", 'internet', 'sewer'];
  updater = false;
  rI;
  rotationIndex = this.firebase.object('chores/rotationIndex').valueChanges();

  @ViewChildren(TileComponent) tiles: QueryList<TileComponent>;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (event.key == "ArrowLeft") {
      this.activeTab--;
    } else if (event.key == "ArrowRight") {
      this.activeTab++;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 800) {
      this.updater = true;
    } else {
      this.updater = false;
    }
  }



  constructor(private firebase: AngularFireDatabase) {
    if (window.innerWidth < 800) {
      this.updater = true;
    } else {
      this.updater = false;
    }
  }

  ngOnInit() {
    this.rotationIndex.subscribe((r: number) => (this.rI = r));
  }

  ngAfterViewInit() {
    console.log(this.tiles);
    this.resizeAllGridItems();
  }

  loadingComplete() {
    console.log("loading done")
  }

  rotateChores() {
    this.disableCycleButton =true;
    this.firebase.object('chores/rotationIndex').set((this.rI + 1) % 4).then((res) => {

    });
  }


  onKeydown(event) {
    console.log(event.key)
    if (event.key == "39") {
      this.activeTab++;
    } else if (event.key == "37") {
      this.activeTab--;
    }
  }

  resizeAllGridItems() {
    console.log(this.appTiles)
    this.appTiles.forEach((item) => {
      this.resizeGridItem(item);
    });
  }

  resizeGridItem(item) {

  }


}
