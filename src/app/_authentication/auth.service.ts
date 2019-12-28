import { Platform } from '@angular/cdk/platform';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { FirebaseApp } from "@angular/fire";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  user: firebase.User;
  authState: Observable<firebase.User> = this.firebaseAuth.authState;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDB: AngularFireDatabase,
    public router: Router,
    public platform: Platform
  ) {
    this.authState.subscribe(user => {
      if (this.firebaseAuth.auth.currentUser) {
        this.user = firebaseAuth.auth.currentUser;
        this.router.navigate([""]);
      } else {
        this.router.navigate(["/mobile/auth/sign-in"]);
      }
    });
  }

  signIn() {
    if (this.platform.IOS) {
      this.listenForRedirectResult();
      return this.signInWithRedirect();
    } else {
      let provider = new firebase.auth.GoogleAuthProvider();
      return firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithPopup(provider)
            .then(
              (credential: firebase.auth.UserCredential) => {
                console.log(`Logged in.`);
                console.log(credential);
                this.firebaseDB.list("users").update(credential.user.uid, {
                  uid: credential.user.uid,
                  displayName: credential.user.displayName,
                  photoURL: credential.user.photoURL
                });
              },
              error => {
                console.error("Failed to sign in: ", error);
              }
            );
        });
    }
  }

  signInWithRedirect() {
    console.log("signing in with redirect")
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      });
  }

  listenForRedirectResult() {
    console.log("listneing for callback")
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = (<any> result).credential.accessToken;
        console.log(token);
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signOut() {
    return this.firebaseAuth.auth.signOut().then(() => {
      console.log("Signed out");
      this.router.navigate(["sign-in"]);
    });
  }

  checkIdentity() {
    let id = localStorage.getItem("smarthomedashboardID");
    if (!id) {
      let key = this.firebaseDB.database.ref("identities").push({}).key;
      localStorage.setItem("smarthomedashboardID", key);
      id = localStorage.getItem("smarthomedashboardID");
    }
    return id;
  }

  getCurrentUser() {
    return this.user;
  }
}
