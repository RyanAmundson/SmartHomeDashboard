import { Injectable } from "@angular/core";

Injectable();
export class UtilityService {
  isMobileDevice() {
    return window.innerWidth < 800;
  }

  fbObjSquash(ch) {
    return ch.map(c => {
        if(typeof c.payload.val() === 'string'){
            return { key: c.payload.key, value: c.payload.val() };
        } else {
            return { key: c.payload.key, ...c.payload.val() };
        }
    });
  }
}
