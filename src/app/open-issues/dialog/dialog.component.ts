import { OpenIssueLocations, UploadStatus } from './../../_models/models';
import { finalize } from 'rxjs/operators';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/_models/models';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: "shd-create-issue-dialog",
  templateUrl: "dialog.component.html"
})
export class DialogComponent {
  UploadStatus = UploadStatus;
  usersAsync: Observable<Partial<firebase.User>[]> = this.firebase.list("users").valueChanges();
  issueTemplatesAsync: Observable<Issue[]> = <Observable<Issue[]>> this.firebase.list("open-issues/issues").valueChanges();
  locationsAsync: Observable<OpenIssueLocations[]> = <Observable<OpenIssueLocations[]>> this.firebase.list("open-issues/locations").valueChanges();

  get formCorrect() {
    return this.type.value != undefined && this.who.value != undefined && this.upload.status != UploadStatus.inProgress;
  }

  @ViewChild('upload') upload: any;
  @ViewChild('select') type: any;
  @ViewChild('select3') who: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private firebase: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {

  }

  ngAfterViewInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(issue, description, location, user) {
    console.log(this.upload.downloadURL)
    this.dialogRef.close({
      issue: issue,
      type: issue.description,
      description: description || "no description",
      location: location || 'unknown',
      who: {
        uid: user.uid || null,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null
      },
      attachedImgPath: this.upload.downloadURL || null
    });
  }

}
