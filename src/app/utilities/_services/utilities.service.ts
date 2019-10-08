import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map, flatMap, mapTo } from "rxjs/operators";
import { Chore, CssColorStrings } from "src/app/_models/models";
import { Observable } from "rxjs";
import { forkJoin } from "rxjs";
import { UtilityService } from "src/app/_services/utility.service";

@Injectable()
export class UtilitiesService {

  constructor(
    private AFD: AngularFireDatabase,
    private utility: UtilityService
  ) {}

  updateStatus(chore, fbRef: string) {
    let newStatus = chore.status;
    if (chore.status == CssColorStrings.green) {
      newStatus = CssColorStrings.yellow;
    } else if (chore.status == CssColorStrings.yellow) {
      newStatus = CssColorStrings.red;
    } else if (chore.status == CssColorStrings.red) {
      newStatus = CssColorStrings.green;
    }
    this.AFD
      .object(fbRef + "/" + chore.key + "/status")
      .set(newStatus)
      .then(res => {
        console.log(res, "status udpdated for: " + chore.key);
      })
      .then(() => {
        // this.messagingService.sendMessageToAZ(
        //   item.key + " status changed to " + newStatus
        // );
      });
  }
}
