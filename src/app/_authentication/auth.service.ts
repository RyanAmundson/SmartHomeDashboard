import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { FirebaseApp } from "@angular/fire";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: firebase.User;
  userAsync: Observable<firebase.User>;
  authState:Observable<firebase.User>;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDB: AngularFireDatabase,
    public router:Router  
  ) {
    this.userAsync = firebaseAuth.authState;
    firebaseAuth.authState.subscribe(user => {
      this.user = user;
      // if(user) {
      //   this.router.navigate(['mobile']);
      // }
    });
    // this.signIn();
  }

  signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return firebase.auth().signInWithPopup(provider).then((user) => {
      console.log(`Logged in.`);
      console.log(user)
      this.firebaseDB.list("users").update(this.user.uid,{
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL
      });
    })
  }

  signOut() {
    this.firebaseAuth.auth.signOut().then(() => {
      console.log("Signed out");
      this.router.navigate(['']);
    });
  }

  checkIdentity(){
    let id = localStorage.getItem('smarthomedashboardID');
    if(!id) {
      let key = this.firebaseDB.database.ref("identities").push({}).key;
      localStorage.setItem('smarthomedashboardID', key);
      id = localStorage.getItem('smarthomedashboardID');
    }
    return id;
  }
}
