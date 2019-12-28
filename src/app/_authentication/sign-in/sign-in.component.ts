import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'shd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {


  }

  ngOnInit() {
    if (this.auth.user) {
      this.router.navigate(['/mobile']);
    }
  }

  signInWithGoogle() {
    this.auth.signIn().then((res) => {
      console.log(res);
      this.router.navigate(['/mobile']);
    }, (err) => {
      console.error("failed to sign in: ", err);
    })
  }

}
