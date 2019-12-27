import { Observable } from 'rxjs';
export enum CssColorStrings {
  green = "darkgreen",
  red = "darkred",
  yellow = "yellow"
}


export type Chore = {
  key: string;
  id: string;
  icon: string;
  person: string;
  status: ChoreStatus;
  text: string;
}

export enum ChoreStatus {
  good = 'good',
  warning = 'warning',
  critical = 'critical'
}

export enum IssueType {
  Mess,
  Chore,
  QOL
}

export class Issue {
  id: string;
  type: IssueType;
  description: string;
  additionalDescription: string;
  location: string;
  timeToResolve: number;
  nextExpirationTime: number;
  penaltyAmount: number;
  completed: boolean = false;
  timeCreated: number;
  timeLastReset: number;
  timeCompleted: number = null;
  timesPenalized: number = 0;
  who: Partial<firebase.User>;
  attachedImgPath: string;
  imgAsync: Observable<string>;
}

export enum TimeInMS {
  hour = 3600000
}

export enum UploadStatus {
  none,
  started,
  inProgress,
  completed
}

export enum OpenIssueLocations {
  Kitchen,
  "Guest Bathroom",
  "Living Room",
  Hallway,
  Garage,
  "Front yard",
  "Back Yard",
  "Family Room"
}