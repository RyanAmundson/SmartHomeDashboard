import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
notes = [];
  constructor(private firebase: AngularFireDatabase) {
    firebase.database.ref("notes").on("value", (res) => {
      this.notes = Object.values(res.val());
      console.log(this.notes)
    })
  }

  ngOnInit() {
  }

}
