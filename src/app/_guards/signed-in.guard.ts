import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignedInGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.user) {
        return true;
      } else {
        return this.router.parseUrl('/sign-in');
      }
  }
}
