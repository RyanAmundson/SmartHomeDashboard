import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map, flatMap, mapTo } from "rxjs/operators";
import { Chore, CssColorStrings } from "src/app/_models/models";
import { Observable, Subject } from "rxjs";
import { forkJoin } from "rxjs";
import { UtilityService } from "src/app/_services/utility.service";

@Injectable()
export class ChoreService {
  rotationIndexStream: Observable<any> = this.AFD.object(
    "chores/rotationIndex"
  ).valueChanges();
  rotationScheduleStream: Observable<any>;
  choreBreakdownStream: Observable<any> = this.AFD.list("chores/breakdown")
    .snapshotChanges()
    .pipe(map(v => this.utility.fbObjSquash(v)));
  chores: Array<Chore>;
  rotationIndex: number;

  criticalChores = new Map();

  hasCriticalChore: Subject<boolean> = new Subject<boolean>();

  constructor(
    private AFD: AngularFireDatabase,
    private utility: UtilityService
  ) {
    this.getChores().then(chores => {
      Object.keys(chores.val()).forEach(choreKey => {
        console.log(choreKey);
        this.AFD.object("chores/breakdown" + "/" + choreKey + "/isCritical")
          .valueChanges()
          .subscribe(val => {
            console.log(val);
            if (val) {
              this.criticalChores.set(choreKey, true);
            } else {
              this.criticalChores.delete(choreKey);
            }
            console.log(this.criticalChores.size);
            if (this.criticalChores.size > 0) {
              this.hasCriticalChore.next(true);
            } else {
              this.hasCriticalChore.next(false);
            }
          });
      });
    });
  }

  getChores() {
    return this.AFD.database.ref(`chores/breakdown`).once("value");
  }

  getCurrentChores() {
    return this.rotationIndexStream.pipe(
      map((index: number) => {
        this.rotationIndex = index;
        return index;
      }),
      flatMap((index: number) => {
        return this.AFD.list(`chores/rotation/${index}`)
          .snapshotChanges()
          .pipe(map(v => this.utility.fbObjSquash(v)));
      }),
      flatMap(schedule => {
        console.log(schedule);
        return this.choreBreakdownStream.pipe(
          map((chores: Array<Chore>) => {
            chores.forEach(chore => {
              console.log(schedule,chores);
              chore.person = schedule.filter(s => s.key == chore.id)[0].value;
            });
            this.chores = chores;
            return chores;
          })
        );
      })
    );
  }

  rotateChores(choreCount: number) {
    this.checkCritical(this.chores).then(() => {
      var ref = this.AFD.database.ref("chores/rotationIndex");
      ref.transaction(function(currentIndex) {
        var newIndex = (currentIndex || 0) + 1;
        if (newIndex >= choreCount) {
          newIndex = 0;
        }
        return newIndex;
      });
    });
  }

  checkCritical([...chores]) {
    let promises = [];
    console.log("check critical");
    chores.forEach(chore => {
      if (chore.status == CssColorStrings.red) {
        promises.push(this.setCritical(chore, "chores/breakdown", true));
      } else {
        promises.push(this.setCritical(chore, "chores/breakdown", false));
      }
    });
    return Promise.all(promises);
  }

  setCritical(chore, fbRef, isCritical) {
    return this.AFD.object(fbRef + "/" + chore.key).update({
      isCritical: isCritical,
      criticalPerson: chore.person
    });
  }

  updateStatus(chore, fbRef: string) {
    let newStatus = chore.status;
    if (chore.status == CssColorStrings.green) {
      newStatus = CssColorStrings.yellow;
    } else if (chore.status == CssColorStrings.yellow) {
      newStatus = CssColorStrings.red;
    } else if (chore.status == CssColorStrings.red) {
      newStatus = CssColorStrings.green;
    }
    this.AFD.object(fbRef + "/" + chore.key + "/status")
      .set(newStatus)
      .then(res => {
        console.log(res, "status udpdated for: " + chore.key);
      })
      .then(() => {
        this.setCritical(chore, fbRef, false);
      });
  }
}
