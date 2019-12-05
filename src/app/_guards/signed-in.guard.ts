import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { pipe } from 'rxjs';
import { AuthService } from '../_authentication/auth.service';
import { take, map, tap } from 'rxjs/operators';

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
      if (this.auth.getCurrentUser()) { return true; }

      return this.auth.authState.pipe(
           take(1),
           map(user => !!user),
           tap(loggedIn => {
             if (!loggedIn) {
               console.log("access denied")
               this.router.navigate(['/auth/sign-in'], next);
             } else {
               console.log("logged in");
             }
         }));
  }
}
