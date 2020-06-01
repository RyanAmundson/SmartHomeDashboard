import { Component, OnInit, HostListener, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { SwPush } from '@angular/service-worker';
// import { PushNotificationService, PushNotificationOptions } from 'ngx-push-notifications';
import { timer } from 'rxjs';
import { TileComponent } from '../../_shared/tile/tile.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { ChoresComponent } from '../../chores/chores.component';
import { ChoreService } from '../../chores/_services/chore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-static.component.html',
  styleUrls: ['./dashboard-static.component.scss']
})
export class DashboardStaticComponent implements OnInit {
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
  rI;
  rotationIndex = this.firebase.object('chores/rotationIndex').valueChanges();

  @ViewChildren(TileComponent) tiles: QueryList<TileComponent>;
  @ViewChild(ChoresComponent) choreComp: ChoresComponent;
  
  criticalChores = false;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (event.key == "ArrowLeft") {
      this.activeTab--;
    } else if (event.key == "ArrowRight") {
      this.activeTab++;
    }

  }

  constructor(private firebase: AngularFireDatabase, public choreService:ChoreService) {
  }

  ngOnInit() {
    this.rotationIndex.subscribe((r: number) => (this.rI = r));
    this.choreService.hasCriticalChore.subscribe((has) => {
      this.criticalChores = has;
    });
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
