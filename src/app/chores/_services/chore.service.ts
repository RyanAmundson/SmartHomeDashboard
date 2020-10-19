import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map, flatMap, mapTo } from "rxjs/operators";
import { Chore, CssColorStrings, ChoreStatus } from "src/app/_models/models";
import { Observable, Subject } from "rxjs";
import { forkJoin } from "rxjs";
import { UtilityService } from "src/app/_services/utility.service";
import { MessagingService } from 'src/app/_shared/messaging.service';


export interface IChoreService {

}

@Injectable()
export class ChoreService {
  rotationIndexStream: Observable<any> = this.database.object(
    "chores/rotationIndex"
  ).valueChanges();
  rotationScheduleStream: Observable<any>;
  choreBreakdownStream: Observable<any> = this.database.list("chores/breakdown")
    .snapshotChanges()
    .pipe(map(v => this.utility.fbObjSquash(v)));
  chores: Array<Chore>;
  rotationIndex: number;

  criticalChores = new Map();

  hasCriticalChore: Subject<boolean> = new Subject<boolean>();

  constructor(
    private database: AngularFireDatabase,
    private utility: UtilityService,
    private messageService: MessagingService
  ) {
    // this.getChores().then(chores => {
    //   Object.keys(chores.val()).forEach(choreKey => {
    //     console.log(choreKey);
    //     this.database.object("chores/breakdown" + "/" + choreKey + "/isCritical")
    //       .valueChanges()
    //       .subscribe(val => {
    //         if (val) {
    //           this.criticalChores.set(choreKey, true);
    //         } else {
    //           this.criticalChores.delete(choreKey);
    //         }
    //         if (this.criticalChores.size > 0) {
    //           this.hasCriticalChore.next(true);
    //         } else {
    //           this.hasCriticalChore.next(false);
    //         }
    //       });
    //   });
    // });
  }

  getChores() {
    return this.database.database.ref(`chores/breakdown`).once("value");
  }

  getCurrentChores() {
    return this.rotationIndexStream.pipe(
      map((index: number) => {
        this.rotationIndex = index;
        return index;
      }),
      flatMap((index: number) => {
        // console.log(index)
        return this.database.list(`chores/rotation/${index}`)
          .snapshotChanges()
          .pipe(map(v => this.utility.fbObjSquash(v)));
      }),
      flatMap(schedule => {
        return this.choreBreakdownStream.pipe(
          map((chores: Array<Chore>) => {
            chores.forEach(chore => {
              chore.person = schedule.filter(s => s.key == chore.id)[0].value;
              // console.log(chore.person, chore.id, schedule)
            });
            this.chores = chores;
            // console.log(chores)
            return chores;
          })
        );
      })
    );
  }

  rotateChores(choreCount: number) {
    this.checkCritical(this.chores).then(() => {
      var ref = this.database.database.ref("chores/rotationIndex");
      ref.transaction(function (currentIndex) {
        var newIndex = (currentIndex || 0) + 1;
        if (newIndex >= choreCount) {
          newIndex = 0;
        }
        return newIndex;
      }).then(() => {
        // this.messageService.sendMessageToAZ("Chores have been rotated!");
      });
    });
  }

  checkCritical([...chores]) {
    let promises = [];
    // console.log("check critical");
    chores.forEach(chore => {
      if (chore.status == ChoreStatus.critical) {
        promises.push(this.setCritical(chore, "chores/breakdown", true));
        // this.messageService.sendMessageToAZ(chore.key + " needs to be done before chores can rotate");
      } else {
        promises.push(this.setCritical(chore, "chores/breakdown", false));
      }
    });
    return Promise.all(promises);
  }

  setCritical(chore, fbRef, isCritical) {
    return this.database.object(fbRef + "/" + chore.key).update({
      isCritical: isCritical,
      criticalPerson: chore.person
    });
  }

  updateChore(chore, fbRef: string) {
    this.database.object(fbRef + "/" + chore.key)
      .update(chore)
      .then(res => {
        // console.log("chore updated for: " + chore.key);
        // this.messageService.sendMessageToAZ("status updated for: " + chore.key + " to " + newStatus);
      })
      .then(() => {
        // this.setCritical(chore, fbRef, false);
      });
  }

  updateStatus(newStatus: string, previousStatus: string, statusRef: string) {
    // console.log(newStatus, previousStatus, statusRef)
    return Promise.all([
      this.database.database.ref(statusRef + '/previousStatus').set(previousStatus),
      this.database.database.ref(statusRef + '/status').set(newStatus)
        .then(res => {
          // this.messageService.sendMessageToAZ("status updated for: " + chore.key + " to " + newStatus);
        })
    ]);

  }
}
