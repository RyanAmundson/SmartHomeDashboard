import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map, flatMap, mapTo, tap, switchMap, withLatestFrom } from "rxjs/operators";
import { Chore, CssColorStrings, ChoreStatus } from "src/app/_models/models";
import { Observable, Subject, combineLatest } from "rxjs";
import { forkJoin } from "rxjs";
import { UtilityService } from "src/app/_services/utility.service";
import { MessagingService } from 'src/app/_shared/messaging.service';

@Injectable()
export class ChoreService {
  currentRotation$: Observable<any> = this.AFD.object(
    "chores/rotationIndex"
  ).valueChanges();
  rotationSchedule$: Observable<any>;
  rotationIndex$: Observable<any>;
  people$ = this.AFD.list("people").snapshotChanges(['child_added', 'child_changed']).pipe(map(v => this.utility.fbObjSquash(v)));
  chores$: Observable<any> = this.AFD.list("chores/breakdown").snapshotChanges().pipe(map(v => this.utility.fbObjSquash(v)));
  chores: Array<Chore>;
  rotationIndex: number;

  criticalChores = new Map();

  hasCriticalChore: Subject<boolean> = new Subject<boolean>();

  constructor(
    private AFD: AngularFireDatabase,
    private utility: UtilityService,
    private messageService: MessagingService
  ) {
  }

  getChores() {
    return this.AFD.database.ref(`chores/breakdown`).once("value");
  }

  getCurrentChores() {

    let choreIdToPersonId$ = this.currentRotation$.pipe(
      switchMap((index) => this.AFD.list(`chores/rotation/${index}`).snapshotChanges().pipe(map(v => this.utility.fbObjSquash(v))))
    );

    let currentChoreMap$ = combineLatest([choreIdToPersonId$, this.chores$, this.people$]).pipe(
      map(([choreIdToPersonId, chores, people] : [any[],any[],any[]]) => {
        console.log(choreIdToPersonId)
        return choreIdToPersonId.map(({ choreId, personId }) => {
          console.log(choreId,personId)
          return { "chore": chores.find((chore) => choreId === chore.id), "person": people.find((person) => personId === person.id) }
        })
      }),
      tap(console.log)
    );

    return currentChoreMap$;
  }

  rotateChores(choreCount: number) {
    var currentRotationIndexRef = this.AFD.database.ref("chores/rotationIndex");
  }

  updateChore(chore, fbRef: string) {
    this.AFD.object(fbRef + "/" + chore.key)
      .update(chore)
      .then(res => {
        console.log("chore updated for: " + chore.key);
        // this.messageService.sendMessageToAZ("status updated for: " + chore.key + " to " + newStatus);
      })
      .then(() => {
        // this.setCritical(chore, fbRef, false);
      });
  }

  updateStatus(newStatus: string, previousStatus: string, statusRef: string) {
    console.log(newStatus, previousStatus, statusRef)
    return Promise.all([
      this.AFD.database.ref(statusRef + '/previousStatus').set(previousStatus),
      this.AFD.database.ref(statusRef + '/status').set(newStatus)
        .then(res => {
          // this.messageService.sendMessageToAZ("status updated for: " + chore.key + " to " + newStatus);
        })
    ]);

  }
}
