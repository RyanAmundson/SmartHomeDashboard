import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GeneratedStyles } from "../../../assets/animate";
import { trigger, transition, animate } from "@angular/animations";
import { UtilityService } from "../../_services/utility.service";
import { ChoreService } from "../_services/chore.service";
import { Chore, ChoreStatus } from "../../_models/models";
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

  choreStream: Observable<any>;
  good;
  warning;
  critical;


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
        map(list => {
          console.log("!@@@#@#!")
          if (JSON.stringify(list) !== JSON.stringify(this.listFromFB)) {
            this.listFromFB = list;
            return list;
          } else {
            return null;
          }
        })
      )
      .pipe(
        map(list => {
          if (list != null) {
            return {
              good: list.filter(i => i.status === ChoreStatus.good),
              warning: list.filter(i => i.status === ChoreStatus.warning),
              critical: list.filter(i => i.status === ChoreStatus.critical)
            };
          } else {
            return null;
          }
        })
      );
    this.choreStream
      .subscribe(result => {
        console.log(result)
        if (result != null) {
          this.good = result.good;
          this.warning = result.warning;
          this.critical = result.critical;
        } else {
          console.log("no changes");
        }
      });
  }

  ngAfterViewInit() {
    this.loadingComplete.emit();
  }



  drop(event: CdkDragDrop<string[]>, status: string) {
    // ignore event if list updated from server since picking up
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    let chore = <any>event.container.data[event.currentIndex];
    chore.previousStatus = event.item.data.previousStatus;
    chore.status = status;
    console.log(event.item.data, event.container.data, chore);
    if (chore.status != chore.previousStatus) {
      this.choreService.updateChore(chore, "/chores/breakdown");
    } else {
      console.log("no status change")
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
  }
}
