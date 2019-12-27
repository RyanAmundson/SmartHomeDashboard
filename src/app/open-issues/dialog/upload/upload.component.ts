import { Observable } from 'rxjs';
import { UploadStatus } from './../../../_models/models';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'shd-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() firebaseDirectory: string = 'open-issues/images/';
  @Output() uploadStatus: EventEmitter<UploadStatus> = new EventEmitter();
  _status: UploadStatus;
  get status() {
    return this._status;
  }
  set status(status: UploadStatus) {
    this._status = status;
    this.uploadStatus.emit(status);
    if (status == UploadStatus.started) {
      this._status = UploadStatus.inProgress;
    }
  }
  uploadProgressAsync;
  image;
  downloadURLAsync;
  downloadURL;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  uploadFile(event): Observable<string> {
    this.status = UploadStatus.started;
    const file = event.target.files[0];
    this.image = file;
    const filePath = this.firebaseDirectory + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadProgressAsync = task.percentageChanges();
    this.downloadURLAsync = fileRef.getDownloadURL();
    this.downloadURLAsync.subscribe((url) => {
      this.status = UploadStatus.completed;
      return this.downloadURL = url;
    });
    return this.downloadURLAsync;
  }

}
