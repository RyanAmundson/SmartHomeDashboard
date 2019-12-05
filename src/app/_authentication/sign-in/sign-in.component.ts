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
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.auth.signIn().then((res) => {
      this.router.navigate(['']);
    }, (err) => {
      console.error("failed to sign in: ", err);
    })
  }

}
