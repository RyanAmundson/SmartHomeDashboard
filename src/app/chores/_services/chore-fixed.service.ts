import { ChoreAssignment, FirebaseRefStrings, ChoreRotationEntry, Person } from './../../_models/models';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map, flatMap, mapTo, switchMap, mergeMap } from "rxjs/operators";
import { Chore, CssColorStrings, ChoreStatus } from "src/app/_models/models";
import { Observable, Subject } from "rxjs";
import { forkJoin } from "rxjs";
import { UtilityService } from "src/app/_services/utility.service";
import { MessagingService } from 'src/app/_shared/messaging.service';


export interface IChoresService {
  getAllChores(): Observable<Chore[]>;
  getChore(choreID: number): Promise<Chore>;
  getCurrentRotation();
  getRotationIndex();
  getChoreStatus(chore: Chore): Observable<ChoreStatus>;
  updateChore(chore: Chore);
  isChoreCritical(choreID: number): Promise<boolean>;

}

@Injectable()
export class ChoresService {

  constructor(
    private db: AngularFireDatabase,
    private utility: UtilityService,
    private messageService: MessagingService
  ) {

  }

  getAllChores(): Observable<Chore[]> {
    return <Observable<Chore[]>> this.db.list(FirebaseRefStrings.chores).valueChanges();
  }

  getCurrentChoreAssignment(): Observable<ChoreAssignment> {
    //TODO: needs testing
    return this.streamCurrentRotation().pipe(
      mergeMap((choreRotation: ChoreRotationEntry[]) => {
        return choreRotation.map((entry: ChoreRotationEntry) => {
          return Object.assign(entry,
            <ChoreAssignment> {
              chore: this.getChore(entry.choreID).toPromise(),
              person: this.getPerson(entry.personID).toPromise()
            });
        })
      })
    );
  }

  getChore(choreID: number): Observable<Chore | unknown> {
    return <Observable<Chore | unknown>> this.db.list(FirebaseRefStrings.chores + "/" + choreID).valueChanges();
  }

  getPerson(personID: number): Observable<Person> {
    return this.db.list(FirebaseRefStrings.people + "/" + personID).valueChanges();
  }

  streamCurrentRotation() {
    return this.getRotationIndex().pipe(flatMap((index: number) => this.getRotation(index)));
  }

  getRotation(index: number) {
    //TODO: needs testing
    return this.db.list(FirebaseRefStrings.choreRotations + "/" + index).valueChanges();
  }

  getRotationIndex(): Observable<number | unknown> {
    return <Observable<number | unknown>> this.db.list(FirebaseRefStrings.choreRotationIndex).valueChanges();
  }

  getChoreStatus(chore: Chore): Observable<ChoreStatus> {
    return null;
  }

  updateChore(chore: Chore) {
    return null;
  }

  isChoreCritical(choreID: number): Promise<boolean> {
    return null;
  }



}



// rotationIndexStream: Observable < any > = this.database.object(
//   "chores/rotationIndex"
// ).valueChanges();
// rotationScheduleStream: Observable<any>;
// choreBreakdownStream: Observable < any > = this.database.list("chores/breakdown")
//   .snapshotChanges()
//   .pipe(map(v => this.utility.fbObjSquash(v)));
// chores: Array<Chore>;
// rotationIndex: number;

// criticalChores = new Map();

// hasCriticalChore: Subject < boolean > = new Subject<boolean>();

// constructor(
//   private database: AngularFireDatabase,
//   private utility: UtilityService,
//   private messageService: MessagingService
// ) {
//   this.getChores().then(chores => {
//     Object.keys(chores.val()).forEach(choreKey => {
//       console.log(choreKey);
//       this.database.object("chores/breakdown" + "/" + choreKey + "/isCritical")
//         .valueChanges()
//         .subscribe(val => {
//           if (val) {
//             this.criticalChores.set(choreKey, true);
//           } else {
//             this.criticalChores.delete(choreKey);
//           }
//           if (this.criticalChores.size > 0) {
//             this.hasCriticalChore.next(true);
//           } else {
//             this.hasCriticalChore.next(false);
//           }
//         });
//     });
//   });
// }

// getChores() {
//   return this.database.database.ref(`chores/breakdown`).once("value");
// }

// getCurrentChores() {
//   return this.rotationIndexStream.pipe(
//     map((index: number) => {
//       this.rotationIndex = index;
//       return index;
//     }),
//     flatMap((index: number) => {
//       return this.database.list(`chores/rotation/${index}`)
//         .snapshotChanges()
//         .pipe(map(v => this.utility.fbObjSquash(v)));
//     }),
//     flatMap(schedule => {
//       return this.choreBreakdownStream.pipe(
//         map((chores: Array<Chore>) => {
//           chores.forEach(chore => {
//             chore.person = schedule.filter(s => s.key == chore.id)[0].value;
//           });
//           this.chores = chores;
//           return chores;
//         })
//       );
//     })
//   );
// }

// rotateChores(choreCount: number) {
//   this.checkCritical(this.chores).then(() => {
//     var ref = this.database.database.ref("chores/rotationIndex");
//     ref.transaction(function (currentIndex) {
//       var newIndex = (currentIndex || 0) + 1;
//       if (newIndex >= choreCount) {
//         newIndex = 0;
//       }
//       return newIndex;
//     }).then(() => {
//       // this.messageService.sendMessageToAZ("Chores have been rotated!");
//     });
//   });
// }

// checkCritical([...chores]) {
//   let promises = [];
//   console.log("check critical");
//   chores.forEach(chore => {
//     if (chore.status == ChoreStatus.critical) {
//       promises.push(this.setCritical(chore, "chores/breakdown", true));
//       // this.messageService.sendMessageToAZ(chore.key + " needs to be done before chores can rotate");
//     } else {
//       promises.push(this.setCritical(chore, "chores/breakdown", false));
//     }
//   });
//   return Promise.all(promises);
// }

// setCritical(chore, fbRef, isCritical) {
//   return this.database.object(fbRef + "/" + chore.key).update({
//     isCritical: isCritical,
//     criticalPerson: chore.person
//   });
// }

// updateChore(chore, fbRef: string) {
//   this.database.object(fbRef + "/" + chore.key)
//     .update(chore)
//     .then(res => {
//       console.log("chore updated for: " + chore.key);
//       // this.messageService.sendMessageToAZ("status updated for: " + chore.key + " to " + newStatus);
//     })
//     .then(() => {
//       // this.setCritical(chore, fbRef, false);
//     });
// }

// updateStatus(newStatus: string, previousStatus: string, statusRef: string) {
//   console.log(newStatus, previousStatus, statusRef)
//   return Promise.all([
//     this.database.database.ref(statusRef + '/previousStatus').set(previousStatus),
//     this.database.database.ref(statusRef + '/status').set(newStatus)
//       .then(res => {
//         // this.messageService.sendMessageToAZ("status updated for: " + chore.key + " to " + newStatus);
//       })
//   ]);

// }
