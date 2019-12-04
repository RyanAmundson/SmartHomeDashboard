import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class IsMobileGuard implements CanActivate {

  constructor(
    private platform: Platform,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.platform.ANDROID || this.platform.IOS) {
        return true;
      } else {
        return false;
      }
  }
}
