export enum CssColorStrings {
  green = "darkgreen",
  red = "darkred",
  yellow = "yellow"
}


export type Chore = {
  key:string;
  id:string;
  icon:string;
  person:string;
  status:ChoreStatus;
  text:string;
}

export enum ChoreStatus {
  good  ='good',
  warning = 'warning',
  critical = 'critical'
}

