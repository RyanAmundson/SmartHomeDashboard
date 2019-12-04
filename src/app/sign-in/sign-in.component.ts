import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    if(this.auth.user) {
      this.router.navigate(['mobile']).then((res) => {
        console.log(res)
      })
    }
  }

  signInWithGoogle() {
    this.auth.signIn().then((res) => {
      this.router.navigate(['mobile']);
    })
  }

}
