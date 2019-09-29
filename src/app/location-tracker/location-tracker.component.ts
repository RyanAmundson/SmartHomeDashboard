import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-location-tracker',
  templateUrl: './location-tracker.component.html',
  styleUrls: ['./location-tracker.component.scss']
})
export class LocationTrackerComponent implements OnInit {
  people;
  constructor(private firebase: AngularFireDatabase) { }

  ngOnInit() {
    this.people = this.firebase.list('people').snapshotChanges()
    .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

}
