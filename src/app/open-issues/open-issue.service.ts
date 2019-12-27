
import { Injectable } from '@angular/core';
import { Issue } from '../_models/models';
import { Observable } from 'rxjs';
import { AuthService } from '../_authentication/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, tap } from 'rxjs/operators';
import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class OpenIssuesService {

    constructor(private auth: AuthService, private firebaseDB: AngularFireDatabase, public dialog: MatDialog) {
    }

    getIssue(id) {
        return this.firebaseDB.list(`open-issues/full-list/${id}`).valueChanges();
    }

    getAllOpenIssues(user?: string): Observable<Issue[]> {
        return (<Observable<Issue[]>>this.firebaseDB.list("open-issues/full-list").valueChanges());
    }

    getNewIssues(): Observable<Issue[]> {
        return (<Observable<Issue[]>>this.firebaseDB.list("open-issues/full-list").valueChanges()).pipe(
            map((issues: Issue[]) => {
                return issues.filter((issue: Issue) => {
                    return (new Date().getTime() - issue.timeCreated) > 3600000;
                });
            })
        )
    }

    getAlmostDueIssues(): Observable<Issue[]> {
        return (<Observable<Issue[]>>this.firebaseDB.list("open-issues/full-list").valueChanges()).pipe(
            map((issues: Issue[]) => {
                return issues.filter((issue: Issue) => {
                    return ((issue.timeCreated + issue.timeToResolve) - new Date().getTime()) < 3600000;
                });
            })
        )
    }

    getPastDueIssues(): Observable<Issue[]> {
        return (<Observable<Issue[]>>this.firebaseDB.list("open-issues/full-list").valueChanges()).pipe(
            map((issues: Issue[]) => {
                return issues.filter((issue: Issue) => {
                    return ((issue.timeCreated + issue.timeToResolve) - new Date().getTime()) < 0;
                });
            })
        )
    }

    createIssue(result): Promise<any> {
        if (result) {
            let ref = this.firebaseDB.list("open-issues/full-list").push(new Issue());
            let timeCreated = new Date().getTime();
            console.log(result)
            return ref.set(<Issue>{
                id: ref.key,
                type: result.type,
                description: result.description,
                additionalDescription: result.description,
                location: result.location,
                timeToResolve: result.issue.timeToResolve,
                timeCreated: timeCreated,
                timeLastReset: timeCreated,
                nextExpirationTime: timeCreated + result.issue.timeToResolve,
                penaltyAmount: result.issue.penaltyAmount,
                timesPenalized: 0,
                who: result.who,
                attachedImgPath: result.attachedImgPath
            });
        }
    }

    updateIssue(issue: Issue) {
        //time
        issue.timesPenalized = Math.trunc(
            (new Date().getTime() - issue.timeCreated) / issue.timeToResolve
        );
        issue.timeLastReset = issue.timeCreated + (issue.timesPenalized * issue.timeToResolve);
        issue.nextExpirationTime = issue.timeCreated + ((issue.timesPenalized * issue.timeToResolve) + issue.timeToResolve);
        //identity
        issue.who = {
            uid: this.auth.user.uid,
            displayName: this.auth.user.displayName,
            photoURL: this.auth.user.photoURL
        };
    }

    calculateTimesPenalized(issue: Issue) {
        return Math.trunc(
            (new Date().getTime() - issue.timeCreated) / issue.timeToResolve
        );
    }

    penalizeIssue(issue: Issue) {

        issue.timesPenalized = Math.trunc(
            (new Date().getTime() - issue.timeCreated) / issue.timeToResolve
        );

        //reset expiration to 1 more time chunk
        issue.timeLastReset = issue.timeCreated + (issue.timesPenalized * issue.timeToResolve);
        issue.nextExpirationTime = issue.timeCreated + ((issue.timesPenalized * issue.timeToResolve) + issue.timeToResolve);
        this.firebaseDB.list("open-issues/full-list").update(issue.id, issue);
        // this.firebaseDB.list(`open-issues/penalties/${this.auth.user.displayName}`).update(issue.id, issue);
    }

    archiveIssue() {

    }


    claimIssue(issue: Issue): Promise<void> {
        issue.who = {
            uid: this.auth.user.uid,
            displayName: this.auth.user.displayName,
            photoURL: this.auth.user.photoURL
        };

        return this.firebaseDB.list("open-issues/full-list").update(issue.id, issue).catch((err) => {
            console.error(err);
            throw "Failed to claim issue";
        });
    }

    unclaimIssue(issue: Issue): Promise<void> {
        issue.who = null;
        return this.firebaseDB.list("open-issues/full-list").update(issue.id, issue).catch((err) => {
            console.error(err);
            throw "Failed to unclaim issue";
        });
    }

    completeIssue(issue: Issue): Promise<[void, void]> {
        issue.timeCompleted = new Date().getTime();
        return Promise.all(
            [
                this.firebaseDB.list("open-issues/archive").update(issue.id, issue),
                this.firebaseDB.list("open-issues/full-list").remove(issue.id)
            ]
        ).catch((err) => {
            console.error(err);
            throw "Failed to complete issue";
        });
    }

    getPenaltyCountByUser(userId) {
        let archived = this.firebaseDB.list("open-issues/archive").query.once('value').then((items) => {
            console.log(items.val());
            if (items.val()) {
                let res = Object.values(items.val())
                    .filter((item: Issue) => {
                        return item.who.uid === userId;
                    })
                    .map((item: Issue) => {
                        return item.timesPenalized
                    })
                    .reduce((acc: any, val: any) => {
                        console.log(acc, val)
                        return acc + val;
                    });

                console.log(res);
                return res;
            }
            return null;
        });
        let active = this.firebaseDB.list("open-issues/full-list").query.once('value').then((items) => {
            console.log(items.val());
            if (items.val()) {
                let res = Object.values(items.val())
                    .filter((item: Issue) => {
                        return item.who.uid === userId;
                    })
                    .map((item: Issue) => {
                        return item.timesPenalized
                    })
                    .reduce((acc: any, val: any) => {
                        console.log(acc, val)
                        return acc + val;
                    });

                return res;
            }
            return null;
        });
        return Promise.all([archived, active]).then(([archived, active]) => {
            return archived + active;
        });
    }
}