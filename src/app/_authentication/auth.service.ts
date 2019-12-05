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
    public router: Router
  ) {
    this.authState.subscribe(user => {
      if (this.firebaseAuth.auth.currentUser) {
        this.user = firebaseAuth.auth.currentUser;
        this.router.navigate([""]);
      } else {
        this.router.navigate(["/auth/sign-in"]);
      }
    });
  }

  signIn() {
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
