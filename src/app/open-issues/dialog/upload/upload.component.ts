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

  uploadFile(event): void {
    this.status = UploadStatus.started;
    const file = event.target.files[0];
    this.image = file;
    const filePath = this.firebaseDirectory + file.name + new Date().getTime().toString();
    const task = this.storage.upload(filePath, file);
    this.uploadProgressAsync = task.percentageChanges();
    task.then(() => {
      const fileRef = this.storage.ref(filePath);


      fileRef.getDownloadURL().subscribe((url) => {
        this.status = UploadStatus.completed;
        this.downloadURL = url;
        console.log(url);
      }, err => {
        this.status = UploadStatus.completed;
        console.error(err);
      });
    });
  }

}
