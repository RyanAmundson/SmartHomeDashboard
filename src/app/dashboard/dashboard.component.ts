import { Component, OnInit, HostListener, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { SwPush } from '@angular/service-worker';
// import { PushNotificationService, PushNotificationOptions } from 'ngx-push-notifications';
import { timer } from 'rxjs';
import { TileComponent } from '../_shared/tile/tile.component';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // @ViewChildren(TileComponent) appTiles: QueryList<any>;
  title = 'SmartHomeDashboard';
  date = Date.now();
  timeObs = timer(1000, 1000);
  activeTab = 0;
  key;
  disableCycleButton = false;

  choreList = [];
  utilitiesList = ["water","electricity","garbage", 'internet', 'sewer'];
  updater = false;

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


  constructor(private firebase: AngularFireDatabase) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.tiles);
    this.resizeAllGridItems();
  }

  loadingComplete() {
    console.log("loading done")
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
    console.log(this.tiles)
    this.tiles.forEach((item) => {
      this.resizeGridItem(item);
    });
  }

  resizeGridItem(item) {

  }


}
