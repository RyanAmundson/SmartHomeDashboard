import { Chore } from './../../_models/models';
import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  ViewChild
} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map, distinctUntilChanged, distinctUntilKeyChanged, flatMap, tap, bufferCount, toArray } from "rxjs/operators";
import { GeneratedStyles } from "../../../assets/animate";
import { trigger, transition, animate } from "@angular/animations";
import { UtilityService } from "../../_services/utility.service";
import { ChoreService } from "../_services/chore.service";
import { ChoreStatus } from "../../_models/models";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "shd-chore-sorter",
  templateUrl: "./chore-sorter.component.html",
  styleUrls: ["./chore-sorter.component.scss"],
  animations: [
    trigger("fade", [
      transition(`:leave`, [
        animate("0.5s ease", GeneratedStyles.Animations.fadeOut)
      ]),

      transition(`:enter`, [
        animate("0.5s ease", GeneratedStyles.Animations.fadeIn)
      ])
    ]),
    trigger("fadeHorizontal", [
      transition(`:leave`, [
        animate("0.5s ease", GeneratedStyles.Animations.fadeOutRight)
      ]),

      transition(`:enter`, [
        animate("0.5s ease", GeneratedStyles.Animations.fadeInLeft)
      ]),

      transition(`:increment`, [
        animate("0.5s ease", GeneratedStyles.Animations.fadeOutRight),
        animate("0.5s 0.5s ease", GeneratedStyles.Animations.fadeInLeft)
      ]),

      transition(`:decrement`, [
        animate("0.5s ease", GeneratedStyles.Animations.fadeOutRight),
        animate("0.5s 0.5s ease", GeneratedStyles.Animations.fadeInLeft)
      ])
    ])
  ]
})
export class ChoreSorterComponent {
  ChoreStatus = ChoreStatus; // required to use enums in template
  listFromFB; // used to check for equivalence only
  @Input() iconsOnly = false;
  @Input() showCritical = false;
  @Output() loadingComplete: EventEmitter<void> = new EventEmitter();
  @ViewChild('warning') warningList;
  choreStream: Observable<any>;
  good;
  warning;
  critical;

  goodAsync;
  warningAsync;
  criticalAsync;
  listLength;

  constructor(
    private utility: UtilityService,
    private choreService: ChoreService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    console.log("chore sorter on init")
    this.choreStream = this.choreService.getCurrentChores()
      .pipe(
        // tap((list) => this.listLength == list.length),
        tap(console.log),
        // flatMap((list) => list),
        distinctUntilChanged(),
        // tap(console.log),
        // bufferCount(4, 4)
      );

    this.goodAsync = this.choreStream.pipe(
      map((items) => {
        console.log(items);
        return items.filter(i => i.chore.status === ChoreStatus.good);
      })
    );
    this.warningAsync = this.choreStream.pipe(
      map((items) => items.filter(i => i.chore.status === ChoreStatus.warning))
    );
    this.criticalAsync = this.choreStream.pipe(
      map((items) => items.filter(i => i.chore.status === ChoreStatus.critical))
    );

    // this.choreStream
    //   .subscribe(result => {
    //     console.log(result)
    //     if (result != null) {
    //       this.good = result.good;
    //       this.warning = result.warning;
    //       this.critical = result.critical;
    //     } else {
    //       console.log("no changes");
    //     }
    //   });
  }

  ngAfterViewInit() {
    this.loadingComplete.emit();
  }

  sorting(event) {
    console.log(event)
  }

  drop(event: CdkDragDrop<string[]>, status: string) {
    let choreAndPerson = event.item.data.details;
    console.log(event, choreAndPerson);
    if (event.previousContainer === event.container) {
      console.log("Moved in same array", event.item.data.previousList,
        event.currentIndex)
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      (<any> event.container.data[event.currentIndex]).previousStatus = event.item.data.previousStatus;
      (<any> event.container.data[event.currentIndex]).status = status;
      if (choreAndPerson.status != choreAndPerson.previousStatus) {
        this.choreService.updateStatus(status, event.item.data.previousStatus, "/chores/breakdown/" + choreAndPerson.chore.key);
      }
    }
  }

  compare(a: Chore[], b: Chore[]) {
    let res = a.filter(item => {
      return b.find((x: Chore) => x.key == item.key && x.person == item.person);
    });

    if ((res.length = a.length)) {
      return true;
    } else {
      return false;
    }

    // (a: Chore[], b: Chore[]) => {

    //   a.forEach((aEntry) => {
    //     if (b.find((bEntry) => aEntry.person !== bEntry.person || aEntry.status !== bEntry.status)) {
    //       return true;
    //     }
    //   });
    //   return false;
    // },
  }

  updateRotation() {
    
  }
}
